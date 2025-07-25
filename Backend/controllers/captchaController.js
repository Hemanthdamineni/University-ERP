const { chromium } = require('playwright');
const path = require('path');

async function fetchCaptcha() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://student.srmap.edu.in/srmapstudentcorner/StudentLoginPage');
    const Captcha = await page.locator('#frmSL').getByRole('img');
    const base_path = path.join(__dirname, '../../Frontend/src/assets/Captcha.png');
    console
    await Captcha.screenshot({path: base_path});
    await browser.close();
}

fetchCaptcha();