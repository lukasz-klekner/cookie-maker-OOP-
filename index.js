const express = require('express')
const cookieParser = require('cookie-parser')
const { engine } = require('express-handlebars')

const { HomeRouter } = require('./routes/home')
const { ConfiguratorRouter } = require('./routes/configurator')
const { OrderRouter } = require('./routes/order')
const { handlebarsHelpers } = require('./utils/handlebars-helpers')

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
        this.app.use('/', new HomeRouter().router)
        this.app.use('/configurator', new ConfiguratorRouter().router)
        this.app.use('/order', new OrderRouter().router)
    }

    _run(){
        this.app.listen(3000, 'localhost')
    }
}

new CookieMakerApp()