// Captcha routes
const express = require('express');
const router = express.Router();
const captchaController = require('../controllers/captchaController');

router.get('/captcha', captchaController.getCaptcha);

module.exports = router; 