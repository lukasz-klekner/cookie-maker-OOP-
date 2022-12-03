const express = require('express')

class ConfiguratorRouter {
    constructor(cmapp) {
        this.cmapp = cmapp
        this.router = express.Router()
        this.setUpRoutes()
    }

    setUpRoutes(){
        this.router.get('/select-base/:baseName', this.selectBase)
        this.router.get('/add-addon/:addonName', this.addAddon)
        this.router.get('/delete-addon/:addonName', this.deleteAddon)
    }

    selectBase = (req, res) => {
        const { baseName} = req.params

        if(!this.cmapp.data.COOKIE_BASES[baseName]){
            return this.cmapp.showErrorPage(res, `There is no such base as ${baseName}`)
        }

        res.cookie('cookieBase', baseName).render('configurator/base-selected', {
            baseName
        })
    }

    addAddon = (req, res) => {
        const { addonName } = req.params

        if(!this.cmapp.data.COOKIE_ADDONS[addonName]){
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

    deleteAddon = (req, res) => {
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

module.exports = {
    ConfiguratorRouter
}