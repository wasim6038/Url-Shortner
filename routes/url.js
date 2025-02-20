const express = require('express');
const { generateNewShortUrl, redirectShortUrl, getAnalytics } = require('../controllers/url')
const router = express.Router();

router.post('/', generateNewShortUrl);

router.get('/:shortid', redirectShortUrl);

router.get('/analytics/:shortid', getAnalytics);

module.exports = router;