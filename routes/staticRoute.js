const express = require('express');
const URL = require('../models/url');
const { restrictTo } = require('../middleware/auth');

const router = express.Router();

router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
        user: req.user,
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    });
});

router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    // if(!req.user) return res.redirect('/login');
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render('home', {
        urls: allUrls,
        user: req.user,
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    });
});

router.get('/signup', async (req, res) => {
    return res.render('signup');
});

router.get('/login', async (req, res) => {
    return res.render('login');
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});


module.exports = router;
