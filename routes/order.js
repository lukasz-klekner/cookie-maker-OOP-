const express = require('express')

const { getCookieSettings } = require('../utils/getCookieSettings')

const orderRouter = express.Router()

orderRouter
    .get('/summary', (req, res) => {
        const { allAddons, allBases, sum, base, addons } = getCookieSettings(req)

        res.render('order/summary', {
        cookie: {
            base,
            addons
        },
        allBases,
        allAddons,
        sum,
})})
    .get('/thanks', (req, res) => {
    const { sum } = getCookieSettings(req)

    res.clearCookie('cookieBase').clearCookie('cookieAddons').render('order/thanks', {
    sum,
})})

module.exports = {
    orderRouter
}