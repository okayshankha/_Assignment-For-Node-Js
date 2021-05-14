
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

  /**
   * @api {post} /api/v1/auth/register 1. User Creation
   * @apiName LoginAuth
   * @apiGroup Auth
   *
   *
   * @apiParam (Body) {String} email Email of the User.
   * @apiParam (Body) {String} name Name of the User.
   * @apiParam (Body) {String} dob Date of birth of the User (YYYY-MM-DD).
   * @apiParam (Body) {String} address Address of the User.
   * @apiParam (Body) {String} description Description of the User.
   * @apiParam (Body) {String} latitude Latitude of the User.
   * @apiParam (Body) {String} longitude Longitude of the User.
   *
   * @apiParamExample {json} Request-Example:
   * {
   *   "email": "shankhascm96+1@gmail.com",
   *   "name": "Shankha",
   *   "dob": "2000-01-21",
   *   "address": "A/4 School Bazar",
   *   "description": "description",
   *   "latitude": 22.416017,
   *   "longitude": 87.326930
   * }
   * @apiSuccessExample Success:
   * 201 CREATED
   * {
   *     "data": {
   *         "message": "User create successful.",
   *         "items": [
   *             {
   *                 "isActive": true,
   *                 "_id": "609d19464da09840f084926b",
   *                 "email": "shankhascm96+1@gmail.com",
   *                 "name": "Shankha",
   *                 "dob": "2000-01-21T00:00:00.000Z",
   *                 "address": "A/4 School Bazar",
   *                 "description": "description",
   *                 "latitude": 22.416017,
   *                 "longitude": 87.32693,
   *                 "createdAt": "2021-05-13T12:19:18.766Z",
   *                 "updatedAt": "2021-05-13T12:19:18.766Z"
   *             }
   *         ]
   *     }
   * }
   *
   * @apiSuccess {Object} data Success Response Object.
   * @apiSuccess {Boolean} data.message User friendly message.
   * @apiSuccess {Boolean} data.token JWT token issued against the credentials.
   *
   *
   * @apiUse ValidationError
   * @apiUse Conflict
   * @apiUse BadRequest
   *
   * @apiDescription Create a new user
   */
  'POST /api/v1/auth/register': { action: 'auth/register' },



  /**
   * @api {get} /api/v1/auth/google 2. Login With Google
   * @apiName GoogleLoginAuth
   * @apiGroup Auth
   *
   * @apiDescription Login with Google, If the user is only registered by the /api/v1/auth/register API, then only it generates a token, else it will say unauthorized.
   */
  'GET /api/v1/auth/google': { action: 'auth/google/google-auth' },



  /**
   * @api {get} /api/v1/auth/google/callback 3. Login With Google Callback
   * @apiName GoogleLoginCallbackAuth
   * @apiGroup Auth
   *
   * @apiDescription Callback url for Google login
   */
  'GET /api/v1/auth/google/callback': { action: 'auth/google/google-auth-callback' },

}
