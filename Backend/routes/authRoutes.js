// Auth routes

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/scrape-page', authController.scrapePage);
// Use a wildcard route and manually extract pageKey
router.get('/scrape/*', (req, res, next) => {
  // Remove '/api/scrape/' prefix to get the pageKey
  req.pageKey = req.path.replace(/^\/api\/scrape\//, '');
  console.log(req.pageKey);
  return require('../controllers/authController').scrapePage(req, res, next);
});

module.exports = router; 