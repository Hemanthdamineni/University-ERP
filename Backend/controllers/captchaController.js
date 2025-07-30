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

    // Generate a session ID and store the browser/page
    const sessionId = uuidv4();
    captchaSessions[sessionId] = { browser, page };

    // Get the captcha as a base64-encoded PNG
    const captchaElement = await page.$('#frmSL img'); // or the correct selector
    const buffer = await captchaElement.screenshot({ type: 'png' });
    const base64 = buffer.toString('base64');
    res.json({ captchaBase64: `data:image/png;base64,${base64}`, sessionId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch captcha' });
  }
};

// Export the session store for use in authController
exports.captchaSessions = captchaSessions; 