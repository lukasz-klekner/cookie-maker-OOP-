const express = require('express')
const cookieParser = require('cookie-parser')
const { engine } = require('express-handlebars')

const { HomeRouter } = require('./routes/home')
const { ConfiguratorRouter } = require('./routes/configurator')
const { OrderRouter } = require('./routes/order')
const { handlebarsHelpers } = require('./utils/handlebars-helpers')
const { COOKIE_ADDONS, COOKIE_BASES} = require('./data/cookies')

class CookieMakerApp {
    constructor(){
        this.app = express()
        this._configureApp()
        this._setRoutes()
        this._run()
    }

    _configureApp(){
        this.app.use(cookieParser())
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.engine('.hbs', engine({ extname: '.hbs', helpers: handlebarsHelpers }))
        this.app.set('view engine', '.hbs')
    }

    _setRoutes(){
        this.app.use('/', new HomeRouter(this).router)
        this.app.use('/configurator', new ConfiguratorRouter(this).router)
        this.app.use('/order', new OrderRouter(this).router)
    }

    _run(){
        this.app.listen(3000, 'localhost')
    }

    getAddonsFromRequest = (req) => {
        const { cookieAddons } = req.cookies
        return cookieAddons ? JSON.parse(cookieAddons) : []
    }

    getCookieSettings = (req) => {
        const { cookieBase: base } = req.cookies
        const addons = this.getAddonsFromRequest(req)

        const allBases = Object.entries(COOKIE_BASES)
        const allAddons = Object.entries(COOKIE_ADDONS)

        const sum = (base ? handlebarsHelpers['find-price'](allBases, base) : 0) + addons.reduce((prev, current) => prev + handlebarsHelpers['find-price'](allAddons ,current), 0)

        return {
            allAddons,
            allBases,
            sum,
            base,
            addons,
        }
    }

    showErrorPage = (res, description) => {
        return res.render('error', {
            description
        })
    }
}

new CookieMakerApp()