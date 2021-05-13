const _ = require('lodash')

function registerRoutes(...routes) {
    let customRoutes = {}
    for (let index = 0; index < routes.length; index++) {
        const route = routes[index].route
        customRoutes = _.merge(customRoutes, route)
    }

    return customRoutes
}

// Import the custom routes
const AuthRoutes = require('./routes/auth')

module.exports.routes = registerRoutes(
    AuthRoutes
)