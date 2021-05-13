
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

  'GET /api/v1/users': { action: 'user/get-all' },

  'GET /api/v1/users/:userId': { action: 'user/get' },

  'PATCH /api/v1/users/:userId': { action: 'user/update' },

  'DELETE /api/v1/users/:userId': { action: 'user/delete' },

  'POST /api/v1/users:undelete/:userId': { action: 'user/un-delete' },

}
