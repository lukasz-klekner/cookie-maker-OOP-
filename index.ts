import { Application, Request, Response, json, static as expressStatic } from 'express';
import * as cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars';

import { HomeRouter } from './routes/home';
import { ConfiguratorRouter } from './routes/configurator';
import { OrderRouter } from './routes/order';
import { handlebarsHelpers } from './utils/handlebars-helpers';
import { COOKIE_ADDONS, COOKIE_BASES} from'./data/cookies';

export class CookieMakerApp {
    private app: Application
    public readonly data = {
        COOKIE_ADDONS,
        COOKIE_BASES
    }
    constructor(){
        this._configureApp()
        this._setRoutes()
        this._run()
    }

    private _configureApp(){
        this.app.use(cookieParser())
        this.app.use(json())
        this.app.use(expressStatic('public'))
        this.app.engine('.hbs', engine({ extname: '.hbs', helpers: handlebarsHelpers }))
        this.app.set('view engine', '.hbs')
    }

    private _setRoutes(){
        this.app.use('/', new HomeRouter(this).router)
        this.app.use('/configurator', new ConfiguratorRouter(this).router)
        this.app.use('/order', new OrderRouter(this).router)
    }

    private _run(){
        this.app.listen(3000, 'localhost')
    }

    getAddonsFromRequest = (req: Request): string[] => {
        const { cookieAddons } = req.cookies
        return cookieAddons ? JSON.parse(cookieAddons) : []
    }

    getCookieSettings = (req: Request) => {
        const { cookieBase: base }: { cookieBase:  string | undefined} = req.cookies
        const addons = this.getAddonsFromRequest(req)

        const allBases = Object.entries(this.data.COOKIE_BASES)
        const allAddons = Object.entries(this.data.COOKIE_ADDONS)

        const sum = (base ? handlebarsHelpers['find-price'](allBases, base) : 0) + addons.reduce((prev, current) => prev + handlebarsHelpers['find-price'](allAddons ,current), 0)

        return {
            allAddons,
            allBases,
            sum,
            base,
            addons,
        }
    }

    showErrorPage = (res: Response, description: string) => {
        return res.render('error', {
            description
        })
    }
}

new CookieMakerApp()