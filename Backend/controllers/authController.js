const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://student.srmap.edu.in/srmapstudentcorner';
const START_URL = `${BASE_URL}/StudentLoginPage`;
const OUTPUT_FILE = 'scraped_dropdowns.json';

const scrapedData = {};
const visited = new Set();

const BUTTON_WHITELIST = [
    'View earlier semester subjects',
    'Application history',
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8',
    'ok'
];

async function login(page) {
    await page.goto(START_URL);
    await page.pause();
    await page.getByRole('button', { name: 'Login' }).click();
    try {
        await page.waitForSelector('#sidebar-menu', { timeout: 10000 });
    } catch {
        throw new Error('Login failed or sidebar did not appear.');
    }
}

async function extractVisibleText(page) {
    // Try to get only the main content area
    return await page.evaluate(() => {
        const main = document.querySelector('#divContent');
        return main ? main.innerText.trim() : document.body.innerText.trim();
    });
}

async function getPageTitle(page, fallback) {
    // Try to get the first heading in the main content area
    try {
        const title = await page.evaluate(() => {
            const main = document.querySelector('#divContent');
            if (!main) return '';
            const h = main.querySelector('h1, h2, h3');
            return h ? h.textContent.trim() : '';
        });
        return title || fallback;
    } catch {
        return fallback;
    }
}

async function extractContentStructured(page) {
    return await page.evaluate(() => {
        const main = document.querySelector('#divContent');
        if (!main) return { title: '', tables: [], text: '' };

        // Get the main heading
        let title = '';
        const h = main.querySelector('h1, h2, h3');
        if (h) title = h.textContent.trim();

        // Extract all tables as arrays of objects
        const tables = [];
        main.querySelectorAll('table').forEach(table => {
            const headers = [];
            const headerCells = table.querySelectorAll('thead tr th');
            if (headerCells.length) {
                headerCells.forEach(th => headers.push(th.innerText.trim()));
            } else {
                // Try first row as header if no thead
                const firstRow = table.querySelector('tr');
                if (firstRow) {
                    firstRow.querySelectorAll('th, td').forEach(cell => headers.push(cell.innerText.trim()));
                }
            }
            // Get all rows (skip header row)
            const rows = [];
            const rowEls = table.querySelectorAll('tbody tr');
            if (rowEls.length) {
                rowEls.forEach(tr => {
                    const cells = tr.querySelectorAll('td');
                    if (cells.length) {
                        const row = {};
                        cells.forEach((td, i) => {
                            row[headers[i] || `col${i+1}`] = td.innerText.trim();
                        });
                        rows.push(row);
                    }
                });
            } else {
                // If no tbody, get all tr except first (header)
                const allRows = table.querySelectorAll('tr');
                allRows.forEach((tr, idx) => {
                    if (idx === 0) return; // skip header
                    const cells = tr.querySelectorAll('td');
                    if (cells.length) {
                        const row = {};
                        cells.forEach((td, i) => {
                            row[headers[i] || `col${i+1}`] = td.innerText.trim();
                        });
                        rows.push(row);
                    }
                });
            }
            if (headers.length && rows.length) tables.push(rows);
        });

        // Extract non-table text (e.g., paragraphs, alerts, divs)
        let text = '';
        // Get all direct children that are not tables
        main.childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'table') return;
            if (node.nodeType === Node.ELEMENT_NODE) {
                const tag = node.tagName.toLowerCase();
                if (["script", "style", "form"].includes(tag)) return;
                text += node.innerText ? node.innerText.trim() + '\n' : '';
            } else if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent.trim() + '\n';
            }
        });
        text = text.trim();

        return { title, tables, text };
    });
}

async function extractModalContent(page) {
    // Scrape content from a modal dialog (tables, text, etc.)
    return await page.evaluate(() => {
        const modal = document.querySelector('.ui-dialog[role="dialog"]');
        if (!modal) return null;
        const contentDiv = modal.querySelector('.ui-dialog-content');
        if (!contentDiv) return null;
        // Extract tables
        const tables = [];
        contentDiv.querySelectorAll('table').forEach(table => {
            const headers = [];
            const headerCells = table.querySelectorAll('thead tr th');
            if (headerCells.length) {
                headerCells.forEach(th => headers.push(th.innerText.trim()));
            } else {
                const firstRow = table.querySelector('tr');
                if (firstRow) {
                    firstRow.querySelectorAll('th, td').forEach(cell => headers.push(cell.innerText.trim()));
                }
            }
            const rows = [];
            const rowEls = table.querySelectorAll('tbody tr');
            if (rowEls.length) {
                rowEls.forEach(tr => {
                    const cells = tr.querySelectorAll('td');
                    if (cells.length) {
                        const row = {};
                        cells.forEach((td, i) => {
                            row[headers[i] || `col${i+1}`] = td.innerText.trim();
                        });
                        rows.push(row);
                    }
                });
            } else {
                const allRows = table.querySelectorAll('tr');
                allRows.forEach((tr, idx) => {
                    if (idx === 0) return;
                    const cells = tr.querySelectorAll('td');
                    if (cells.length) {
                        const row = {};
                        cells.forEach((td, i) => {
                            row[headers[i] || `col${i+1}`] = td.innerText.trim();
                        });
                        rows.push(row);
                    }
                });
            }
            if (headers.length && rows.length) tables.push(rows);
        });
        // Extract non-table text
        let text = '';
        contentDiv.childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'table') return;
            if (node.nodeType === Node.ELEMENT_NODE) {
                const tag = node.tagName.toLowerCase();
                if (["script", "style", "form"].includes(tag)) return;
                text += node.innerText ? node.innerText.trim() + '\n' : '';
            } else if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent.trim() + '\n';
            }
        });
        text = text.trim();
        // Get modal title
        let title = '';
        const h = contentDiv.querySelector('h1, h2, h3');
        if (h) title = h.textContent.trim();
        else {
            // Try dialog titlebar
            const titlebar = modal.querySelector('.ui-dialog-title');
            if (titlebar) title = titlebar.textContent.trim();
        }
        return { title, tables, text };
    });
}

async function handleButtons(page, scrapedData, dropdownText, subItemText) {
    const buttons = await page.$$('#divContent button, #divContent a.btn, #divContent a[target="_blank"], #divContent a[download]');
    if (!buttons.length) return;
    if (!scrapedData[dropdownText][subItemText].buttons) scrapedData[dropdownText][subItemText].buttons = [];

    for (const button of buttons) {
        const buttonText = (await button.textContent())?.trim() || 'Unnamed Button';
        if (!BUTTON_WHITELIST.some(allowed => allowed.toLowerCase() === buttonText.toLowerCase())) continue;
        if (scrapedData[dropdownText][subItemText].buttons.some(b => b.button === buttonText)) continue;
        console.log(`    ⏩ Clicking button: ${buttonText}`);
        let content = null;
        try {
            const modalSelector = '.ui-dialog[role="dialog"]';
            const modalBefore = await page.$(modalSelector);
            await button.click({ timeout: 500 }); // Reduced button click timeout
            let modalAppeared = null;
            if (!modalBefore) {
                modalAppeared = await page.waitForSelector(modalSelector, { timeout: 200 }).catch(() => null); // Reduced modal wait
            } else {
                modalAppeared = modalBefore;
            }
            if (modalAppeared) {
                content = await extractModalContent(page);
                if (buttonText.toLowerCase() === 'application history') {
                    const okButton = await page.$('.ui-dialog[role="dialog"] .ui-dialog-buttonpane button, .ui-dialog[role="dialog"] button');
                    if (okButton) {
                        await okButton.click();
                        await page.waitForSelector(modalSelector, { state: 'detached', timeout: 200 }).catch(() => {});
                    }
                }
            } else {
                await page.waitForTimeout(100); // Reduced content wait
                content = await extractContentStructured(page);
            }
        } catch (err) {
            console.log(`      ⚠️ Error clicking button: ${buttonText}: ${err.message}`);
        }
        const buttonResult = { button: buttonText };
        if (content) buttonResult.content = content;
        scrapedData[dropdownText][subItemText].buttons.push(buttonResult);
    }
}

async function scrapeSidebarDropdownsAndSubItems(page) {
    const dropdowns = await page.$$('#sidebar-menu .side-menu > li');
    for (const li of dropdowns) {
        // Dropdown label
        const dropdownA = await li.$('> a');
        const dropdownText = (await dropdownA.textContent())?.trim();
        if (!dropdownText || visited.has(dropdownText)) continue;
        visited.add(dropdownText);
        console.log(`\n📂 Scraping dropdown: ${dropdownText}`);

        // Click to expand (if it has a submenu)
        try { await dropdownA.click(); await page.waitForTimeout(300); } catch {}

        // Subitems in child_menu
        const subItems = await li.$$('.child_menu > li > a');
        for (const subItem of subItems) {
            const subItemText = (await subItem.textContent())?.trim();
            if (!subItemText || visited.has(`${dropdownText}|${subItemText}`)) continue;
            visited.add(`${dropdownText}|${subItemText}`);
            console.log(`🔗 Visiting [${dropdownText} > ${subItemText}]`);
            try {
                await subItem.click();
                await page.waitForTimeout(1000);
                const content = await extractContentStructured(page);
                if (!scrapedData[dropdownText]) scrapedData[dropdownText] = {};
                scrapedData[dropdownText][subItemText] = content;
                // Handle buttons for additional info or downloads
                await handleButtons(page, scrapedData, dropdownText, subItemText);
            } catch (err) {
                console.log(`⚠️ Error fetching [${dropdownText} > ${subItemText}]: ${err.message}`);
            }
        }

        // Direct links (not in child_menu)
        const directLinks = await li.$$('> a.clsactivity');
        for (const directLink of directLinks) {
            const linkText = (await directLink.textContent())?.trim();
            if (!linkText || visited.has(`${dropdownText}|${linkText}`)) continue;
            visited.add(`${dropdownText}|${linkText}`);
            console.log(`🔗 Visiting [${dropdownText} > ${linkText}]`);
            try {
                await directLink.click();
                await page.waitForTimeout(1000);
                const content = await extractContentStructured(page);
                if (!scrapedData[dropdownText]) scrapedData[dropdownText] = {};
                scrapedData[dropdownText][linkText] = content;
                // Handle buttons for additional info or downloads
                await handleButtons(page, scrapedData, dropdownText, linkText);
            } catch (err) {
                console.log(`⚠️ Error fetching [${dropdownText} > ${linkText}]: ${err.message}`);
            }
        }
    }
}

(async () => {
    const browser = await chromium.launch({ headless: false}); // Headless mode
    const page = await browser.newPage();

    await login(page);
    console.log('✅ Logged in at:', page.url());

    await scrapeSidebarDropdownsAndSubItems(page);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(scrapedData, null, 2));
    console.log(`\n✅ Scraping complete — data saved to ${OUTPUT_FILE}`);

    await browser.close();
})();