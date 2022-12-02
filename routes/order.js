const express = require('express')

const { getCookieSettings } = require('../utils/getCookieSettings')

const orderRouter = express.Router()

class OrderRouter {
    constructor(){
        this.router = express.Router()
        this.setUpRoutes()
    }

    setUpRoutes(){
        this.router.get('/summary', this.summary)
        this.router.get('/thanks', this.thanks)
    }

    summary = (req, res) => {
        const { allAddons, allBases, sum, base, addons } = getCookieSettings(req)

        res.render('order/summary', {
            cookie: {
                base,
                addons
            },
            allBases,
            allAddons,
            sum,
        })
    }

    thanks = (req, res) => {
        const { sum } = getCookieSettings(req)

        res.clearCookie('cookieBase').clearCookie('cookieAddons').render('order/thanks', {
        sum,
        })
    }
}

module.exports = {
    OrderRouter
}