const express = require('express')

const { getCookieSettings } = require('../utils/getCookieSettings')

class HomeRouter {
    constructor() {
        this.router = express.Router()
        this.setUpRoutes()
    }

    setUpRoutes(){
        this.router.get('/', this.home)
    }

    home(req, res){
        const { allAddons, allBases, sum, base, addons } = getCookieSettings(req)

        res.render('home/index', {
        cookie: {
            base,
            addons,
        },
        allBases,
        allAddons,
        sum,
        })
    }
}

module.exports = {
    HomeRouter
}