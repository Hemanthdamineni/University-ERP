const { chromium } = require('playwright');
const fs = require('fs');

const BASE_URL = 'https://student.srmap.edu.in/srmapstudentcorner';
const START_URL = `${BASE_URL}/StudentLoginPage`;
const OUTPUT_FILE = 'Backend/erp_nav_structure.json';

async function extractSidebarNav(page) {
  const nav = [];
  const dropdowns = await page.$$('#sidebar-menu .side-menu > li');
  for (const li of dropdowns) {
    const dropdownA = await li.$('> a');
    const dropdownText = (await dropdownA.textContent())?.trim();
    if (!dropdownText) continue;
    // Expand dropdown to reveal subitems
    try { await dropdownA.click(); await page.waitForTimeout(300); } catch {}
    // Subitems
    const subItems = await li.$$('.child_menu > li > a');
    const subitemList = [];
    for (const sub of subItems) {
      const subText = (await sub.textContent())?.trim();
      if (subText) subitemList.push({ label: subText });
    }
    nav.push({ dropdown: dropdownText, subitems: subitemList });
  }
  return nav;
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(START_URL);
  // Pause for manual login
  await page.pause();
  // Wait for sidebar to load after manual login
  await page.waitForSelector('#sidebar-menu .side-menu > li', { timeout: 10000 });
  const nav = await extractSidebarNav(page);
  console.log(JSON.stringify(nav, null, 2));
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(nav, null, 2));
  console.log(`Navigation structure saved to ${OUTPUT_FILE}`);
  await browser.close();
})(); 