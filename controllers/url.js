const shortid = require('shortid');
const URL = require('../models/url');

async function generateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url){ return res.status(400).json({ error: 'url is required'}) }
    const shortId = shortid.generate();

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        viewHistory: [],
        createdBy: req.user._id,
    })
    return res.render('home', {
        id: shortId,
        baseUrl: process.env.BASE_URL || "http://localhost:3000"
    })
};

async function redirectShortUrl(req, res) {
    const shortId = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: { 
                viewHistory: { timeStamp: Date.now() }
            }
        }
    );
    res.redirect(entry.redirectUrl);
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortid;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks: result.viewHistory.length,
        analytics: result.viewHistory})
}

module.exports = {
    generateNewShortUrl,
    redirectShortUrl,
    getAnalytics,
}