const { COOKIE_ADDONS, COOKIE_BASES } = require('../data/cookies')
const { getAddonsFromRequest } = require('../utils/get-addons-from-request')
const { handlebarsHelpers } = require('../utils/handlebars-helpers')

const getCookieSettings = (req) => {
    const { cookieBase: base } = req.cookies
    const addons = getAddonsFromRequest(req)

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

module.exports = {
    getCookieSettings
}