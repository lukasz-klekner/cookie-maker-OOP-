import { Request, Response, Router } from "express"
import { CookieMakerApp } from "../index"
import { MyRouter } from "../types/my-router"

const express = require('express')

export class HomeRouter implements MyRouter {
    readonly url: string = '/'
    readonly router: Router = Router()

    constructor(private cmapp: CookieMakerApp) {
        this.setUpRoutes()
    }

    private setUpRoutes(){
        this.router.get('/', this.home)
    }

    private home = (req: Request, res: Response) => {
        const { allAddons, allBases, sum, base, addons } = this.cmapp.getCookieSettings(req)

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