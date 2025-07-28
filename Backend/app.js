// Express app entry
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/captchaRoutes'));
app.use('/api', require('./routes/authRoutes'));
app.use('/captcha.png', express.static(path.join(__dirname, '../Frontend/public/captcha.png')));

module.exports = app; 