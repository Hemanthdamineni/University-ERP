const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { captchaSessions } = require('./captchaController');
const scrapeConfig = require('../utils/scrapeConfig');

const BASE_URL = 'https://student.srmap.edu.in/srmapstudentcorner';
const START_URL = `${BASE_URL}/StudentLoginPage`;
const OUTPUT_FILE = 'scraped_dropdowns.json';

const scrapedData = {};
const visited = new Set();

const BUTTON_WHITELIST = [
    'Profile',
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
    await page.getByRole('textbox', { name: 'Enter Application Number /' }).fill('');
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    await page.getByRole('textbox', { name: 'Enter Captcha Text' }).fill('');
    await page.getByRole('button', { name: 'Login' }).click();
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
    // Get all subitem links for restoring state
    const subItems = await page.$$('#sidebar-menu .side-menu > li');
    let subItemLink = null;
    for (const li of subItems) {
        const dropdownA = await li.$('> a');
        const dropdownTextCandidate = (await dropdownA.textContent())?.trim();
        if (dropdownTextCandidate !== dropdownText) continue;
        const subLinks = await li.$$('.child_menu > li > a');
        for (const sub of subLinks) {
            const subText = (await sub.textContent())?.trim();
            if (subText === subItemText) {
                subItemLink = sub;
                break;
            }
        }
        if (subItemLink) break;
    }

    // Get all button texts first to avoid stale element references
    let initialButtons = await page.$$('#divContent button, #divContent a.btn, #divContent a[target="_blank"], #divContent a[download]');
    let buttonTexts = [];
    for (const button of initialButtons) {
        const buttonText = (await button.textContent())?.trim() || 'Unnamed Button';
        if (BUTTON_WHITELIST.some(allowed => allowed.toLowerCase() === buttonText.toLowerCase())) {
            buttonTexts.push(buttonText);
        }
    }

    if (!scrapedData[dropdownText][subItemText].buttons) scrapedData[dropdownText][subItemText].buttons = [];

    for (const buttonText of buttonTexts) {
        // Always restore the subitem state before clicking the next button
        if (subItemLink) {
            await subItemLink.click();
            await page.waitForTimeout(1000);
            // Optionally, wait for a unique selector/text that indicates the default state
        }

        // Re-fetch the buttons after restoring the state
        let buttons = await page.$$('#divContent button, #divContent a.btn, #divContent a[target="_blank"], #divContent a[download]');
        let button = null;
        for (const b of buttons) {
            const bText = (await b.textContent())?.trim() || 'Unnamed Button';
            if (bText === buttonText) {
                button = b;
                break;
            }
        }
        if (!button) continue;
        if (scrapedData[dropdownText][subItemText].buttons.some(b => b.button === buttonText)) continue;

        console.log(`    ⏩ Clicking button: ${buttonText}`);
        let content = null;
        try {
            // Save a reference to the main content before clicking
            const mainContentBefore = await page.$eval('#divContent', el => el.innerText);

            // Click the button
            await button.click();

            // Try to detect a modal
            const modalSelector = '.ui-dialog[role="dialog"]';
            let modalAppeared = await page.waitForSelector(modalSelector, { timeout: 500 }).catch(() => null);

            if (modalAppeared) {
                // Scrape modal content
                content = await extractModalContent(page);
                // Close modal if needed
                const okButton = await page.$('.ui-dialog[role="dialog"] .ui-dialog-buttonpane button, .ui-dialog[role="dialog"] button');
                if (okButton) {
                    await okButton.click();
                    await page.waitForSelector(modalSelector, { state: 'detached', timeout: 500 }).catch(() => {});
                }
            } else {
                // Wait for main content to change (in-place update)
                await page.waitForFunction(
                    (oldContent) => {
                        const main = document.querySelector('#divContent');
                        return main && main.innerText.trim() !== oldContent.trim();
                    },
                    mainContentBefore,
                    { timeout: 2000 }
                );
                // Scrape the new main content
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
    console.log('Dropdowns found:', dropdowns.length);
    for (const li of dropdowns) {
        // Dropdown label
        const dropdownA = await li.$('> a');
        const dropdownText = (await dropdownA.textContent())?.trim();
        console.log('Dropdown:', dropdownText);
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

// Utility to scrape only required subitems for a given page/subpage
async function scrapeSelectedSubitems(page, pageKey, subpageKey) {
  const subitems =
    scrapeConfig[pageKey] && scrapeConfig[pageKey][subpageKey]
      ? scrapeConfig[pageKey][subpageKey]
      : [];
  if (!subitems.length) return {};

  const scrapedData = {};
  const dropdowns = await page.$$('#sidebar-menu .side-menu > li');
  for (const li of dropdowns) {
    const dropdownA = await li.$('> a');
    const dropdownText = (await dropdownA.textContent())?.trim();
    // Find the dropdown that contains the required subitems
    for (const subItemName of subitems) {
      // Expand dropdown
      try { await dropdownA.click(); await page.waitForTimeout(300); } catch {}
      const subLinks = await li.$$('.child_menu > li > a');
      for (const sub of subLinks) {
        const subText = (await sub.textContent())?.trim();
        if (subText === subItemName) {
          await sub.click();
          await page.waitForTimeout(1000);
          const content = await extractContentStructured(page);
          if (!scrapedData[dropdownText]) scrapedData[dropdownText] = {};
          scrapedData[dropdownText][subText] = content;
        }
      }
    }
  }
  return scrapedData;
}

exports.login = async (req, res) => {
    const { username, password, captcha, sessionId } = req.body;
    if (!username || !password || !captcha || !sessionId) {
        console.log('Missing credentials, captcha, or sessionId');
        return res.status(400).json({ success: false, error: 'Missing credentials, captcha, or sessionId' });
    }
    const session = captchaSessions[sessionId];
    if (!session) {
        console.log('Session not found or expired');
        return res.status(400).json({ success: false, error: 'Session not found or expired. Please reload captcha.' });
    }
    const { browser, page } = session;
    try {
        await page.getByRole('textbox', { name: 'Enter Application Number /' }).fill(username);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('textbox', { name: 'Enter Captcha Text' }).fill(captcha);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForTimeout(1500);
        const url = page.url();
        console.log('After login, URL:', url);
        // Check for login failure by URL or error message on page
        const loginFailed = url.includes('StudentLoginPage') || await page.$('text=Invalid Captcha') || await page.$('text=Invalid Credentials');
        if (loginFailed) {
        console.log('Login failed');
        await browser.close();
        delete captchaSessions[sessionId];
        return res.status(401).json({ success: false, error: 'Login failed. Check credentials or captcha.' });
        }
        // If login successful, run scraping
        // console.log('Login successful, starting scraping...');
        // await scrapeSidebarDropdownsAndSubItems(page);
        // console.log('Scraping finished, writing file...');
        // fs.writeFileSync(OUTPUT_FILE, JSON.stringify(scrapedData, null, 2));
        // await browser.close();
        // delete captchaSessions[sessionId];
        // console.log('Done, returning success');
        return res.json({ success: true });
    } catch (err) {
        console.log('Error in login/scraping:', err);
        await browser.close();
        delete captchaSessions[sessionId];
        return res.status(500).json({ success: false, error: err.message });
    }
};

// New endpoint: POST /api/scrape-page
exports.scrapePage = async (req, res) => {
  // Use pageKey set by the route
  const pageKey = req.pageKey;
  const { sessionId } = req.query;
  if (!sessionId || !captchaSessions[sessionId]) {
    return res.status(400).json({ error: 'Missing or invalid sessionId. Please login again.' });
  }
  const { page } = captchaSessions[sessionId];
  const targets = scrapeConfig[pageKey];
  if (!targets || !targets.length) {
    return res.status(404).json({ error: 'No scraping targets for this page' });
  }
  try {
    const result = {};
    const dropdowns = await page.$$('#sidebar-menu .side-menu > li');
    for (const li of dropdowns) {
      const dropdownA = await li.$('> a');
      const dropdownText = (await dropdownA.textContent())?.trim();
      for (const target of targets) {
        if (dropdownText === target.dropdown) {
          try { await dropdownA.click(); await page.waitForTimeout(300); } catch {}
          const subLinks = await li.$$('.child_menu > li > a');
          for (const sub of subLinks) {
            const subText = (await sub.textContent())?.trim();
            if (subText === target.subitem) {
              await sub.click();
              await page.waitForTimeout(1000);
              const content = await extractContentStructured(page);
              if (!result[dropdownText]) result[dropdownText] = {};
              result[dropdownText][subText] = content;
            }
          }
        }
      }
    }
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};