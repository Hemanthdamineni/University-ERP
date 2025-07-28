// Fetches and returns CAPTCHA
const { chromium } = require('playwright');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// In-memory session store: { [sessionId]: { browser, page } }
const captchaSessions = {};

exports.getCaptcha = async (req, res) => {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://student.srmap.edu.in/srmapstudentcorner/StudentLoginPage');
    const captcha = await page.locator('#frmSL').getByRole('img');
    const captchaPath = path.join(__dirname, '../../Frontend/public/captcha.png');
    await captcha.screenshot({ path: captchaPath });
    // Generate a session ID and store the browser/page
    const sessionId = uuidv4();
    captchaSessions[sessionId] = { browser, page };
    // Send the captcha image and session ID
    res.json({ captchaUrl: '/captcha.png?' + Date.now(), sessionId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch captcha' });
  }
};

// Export the session store for use in authController
exports.captchaSessions = captchaSessions; 