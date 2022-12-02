const express = require('express')
const { COOKIE_ADDONS, COOKIE_BASES } = require('../data/cookies')
const { getAddonsFromRequest } = require('../utils/get-addons-from-request')

const configuratorRouter = express.Router()

configuratorRouter
    .get('/select-base/:baseName', (req, res) => {
        const { baseName} = req.params

        if(!COOKIE_BASES[baseName]){
            return res.render('error', {
                description: `There is no such base as ${baseName}`
            })
        }

        res.cookie('cookieBase', baseName).render('configurator/base-selected', {
            baseName
        })
    })
    .get('/add-addon/:addonName', (req, res) => {
        const { addonName } = req.params

        if(!COOKIE_ADDONS[addonName]){
            return res.render('error', {
                description: `There is no such addon as ${addonName}`
            })
        }

        const addons = getAddonsFromRequest(req)

        if(addons.includes(addonName)){
            return res.render('error', {
                description: `${addonName} is already on your cookie. Please choose another addon!`
            })
        }

        addons.push(addonName)

        res.cookie('cookieAddons', JSON.stringify(addons)).render('configurator/addons', {
            addonName
        })
    })
    .get('/delete-addon/:addonName', (req, res) => {
        const { addonName } = req.params

        const addonsFromCookies = getAddonsFromRequest(req)

        if(!addonsFromCookies.includes(addonName)){
            return res.render('error', {
                description: `Cannot delete sth that is not already added to the cookie. ${addonName} not found on cookie.`
            })
        }


        const addons = addonsFromCookies.filter(addon => addon !== addonName)

        res.cookie('cookieAddons', JSON.stringify(addons)).render('configurator/deleted', {
            addonName
        })
    })

module.exports = {
    configuratorRouter
}