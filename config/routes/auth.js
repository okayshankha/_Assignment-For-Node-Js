
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

  'POST /api/v1/auth/register': { action: 'auth/register' },


  'GET /api/v1/auth/google': { action: 'auth/google/google-auth' },

  'GET /api/v1/auth/google/callback': { action: 'auth/google/google-auth-callback' },

}
