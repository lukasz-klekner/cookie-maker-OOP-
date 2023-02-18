import { Request, Response, Router } from "express"
import { CookieMakerApp } from "../index"

export class ConfiguratorRouter {
    public readonly router: Router = Router()

    constructor(private cmapp: CookieMakerApp) {
        this.setUpRoutes()
    }

    private setUpRoutes(){
        this.router.get('/select-base/:baseName', this.selectBase)
        this.router.get('/add-addon/:addonName', this.addAddon)
        this.router.get('/delete-addon/:addonName', this.deleteAddon)
    }

    private selectBase = (req: Request, res: Response): void => {
        const { baseName } = req.params

        if(!(this.cmapp.data.COOKIE_BASES as Record<string, number>)[baseName]){
            return this.cmapp.showErrorPage(res, `There is no such base as ${baseName}`)
        }

        res.cookie('cookieBase', baseName).render('configurator/base-selected', {
            baseName
        })
    }

    private addAddon = (req: Request, res: Response): void => {
        const { addonName } = req.params

        if(!(this.cmapp.data.COOKIE_ADDONS as Record<string, number>)[addonName]){
            return this.cmapp.showErrorPage(res, `There is no such addon as ${addonName}`)
        }

        const addons = this.cmapp.getAddonsFromRequest(req)

        if(addons.includes(addonName)){
            return this.cmapp.showErrorPage(res, `${addonName} is already on your cookie. Please choose another addon!`)
        }

        addons.push(addonName)

        res.cookie('cookieAddons', JSON.stringify(addons)).render('configurator/addons', {
            addonName
        })
    }

    private deleteAddon = (req: Request, res: Response) => {
        const { addonName } = req.params

        const addonsFromCookies = this.cmapp.getAddonsFromRequest(req)

        if(!addonsFromCookies.includes(addonName)){
            return this.cmapp.showErrorPage(res, `Cannot delete sth that is not already added to the cookie. ${addonName} not found on cookie.`)
        }

        const addons = addonsFromCookies.filter(addon => addon !== addonName)

        res.cookie('cookieAddons', JSON.stringify(addons)).render('configurator/deleted', {
            addonName
        })
    }
}