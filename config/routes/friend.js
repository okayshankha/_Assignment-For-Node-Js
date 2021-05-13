
/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.route = {

  'POST /api/v1/friends': { action: 'friend/create' },

  'GET /api/v1/friends': { action: 'friend/get-all' },

  'GET /api/v1/friends:nearby': { action: 'friend/get-all-nearby' },

}
