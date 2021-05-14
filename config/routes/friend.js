
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
   * @api {post} /api/v1/friends 1. Create Friend
   * @apiName CreateFriend
   * @apiGroup Friends
   *
   * @apiHeader Authorization Bearer Token.
   *
   * @apiParam (Body) {String} friendId User id of the user you want to be friend.
   *
   * @apiParamExample {json} Request-Example:
   * {
   *     "friendId": "609d19464da09840f084926b"
   * }
   *
   * @apiSuccessExample Success:
   * 201 CREATED
   * {
   *     "data": {
   *         "message": "Friend create successful.",
   *         "items": [
   *             {
   *                 "_users": [
   *                     "609d191b4da09840f084926a",
   *                     "609d19464da09840f084926b"
   *                 ],
   *                 "isActive": true,
   *                 "_id": "609d2cbb8097ab6b34bfb283",
   *                 "createdAt": "2021-05-13T13:42:19.789Z",
   *                 "updatedAt": "2021-05-13T13:42:19.789Z"
   *             }
   *         ]
   *     }
   * }
   *
   * @apiSuccess {Object} data Success Response Object.
   * @apiSuccess {Boolean} data.message User friendly message.
   * @apiSuccess {Boolean} data.items Friends information
   *
   *
   * @apiDescription Update user by id
   */
  'POST /api/v1/friends': { action: 'friend/create' },




  /**
   * @api {get} /api/v1/friends 2. Get All Friends
   * @apiName GetAllFriend
   * @apiGroup Friends
   *
   * @apiHeader Authorization Bearer Token.
   *
   * @apiSuccessExample Success:
   * 200 OK
   * {
   *     "data": {
   *         "message": "Friends fetch successful.",
   *         "items": [
   *             {
   *                 "_users": [
   *                     {
   *                         "isActive": true,
   *                         "_id": "609d19464da09840f084926b",
   *                         "email": "shankhascm96+1@gmail.com",
   *                         "name": "Shankha",
   *                         "dob": "2000-01-21T00:00:00.000Z",
   *                         "address": "A/4 School Bazar",
   *                         "description": "description",
   *                         "latitude": 22.416017,
   *                         "longitude": 87.32693,
   *                         "createdAt": "2021-05-13T12:19:18.766Z",
   *                         "updatedAt": "2021-05-13T12:19:18.766Z"
   *                     }
   *                 ],
   *                 "isActive": true,
   *                 "_id": "609d2cbb8097ab6b34bfb283",
   *                 "createdAt": "2021-05-13T13:42:19.789Z",
   *                 "updatedAt": "2021-05-13T13:42:19.789Z"
   *             }
   *         ]
   *     }
   * }
   *
   * @apiSuccess {Object} data Success Response Object.
   * @apiSuccess {Boolean} data.message User friendly message.
   * @apiSuccess {Boolean} data.items.__users Friend information
   *
   *
   * @apiDescription Update user by id
   */
  'GET /api/v1/friends': { action: 'friend/get-all' },




  /**
   * @api {get} /api/v1/friends:nearby 3. Get All Nearby Friends
   * @apiName GetAllNearbyFriend
   * @apiGroup Friends
   *
   * @apiHeader Authorization Bearer Token.
   *
   * @apiParam (Query) {String} maximumDistanceInMeters Maximum Distance (In Meters) to find the friends.
   *
   * @apiSuccessExample Success:
   * 200 OK
   * {
   *     "data": {
   *         "message": "Friends fetch successful.",
   *         "items": [
   *             {
   *                 "_users": [
   *                     {
   *                         "isActive": true,
   *                         "_id": "609d19464da09840f084926b",
   *                         "email": "shankhascm96+1@gmail.com",
   *                         "name": "Shankha",
   *                         "dob": "2000-01-21T00:00:00.000Z",
   *                         "address": "A/4 School Bazar",
   *                         "description": "description",
   *                         "latitude": 22.416017,
   *                         "longitude": 87.32693,
   *                         "createdAt": "2021-05-13T12:19:18.766Z",
   *                         "updatedAt": "2021-05-13T12:19:18.766Z"
   *                     }
   *                 ],
   *                 "isActive": true,
   *                 "_id": "609d2cbb8097ab6b34bfb283",
   *                 "createdAt": "2021-05-13T13:42:19.789Z",
   *                 "updatedAt": "2021-05-13T13:42:19.789Z"
   *             }
   *         ]
   *     }
   * }
   *
   * @apiSuccess {Object} data Success Response Object.
   * @apiSuccess {Boolean} data.message User friendly message.
   * @apiSuccess {Boolean} data.items._users Friend information
   *
   *
   * @apiDescription Update user by id
   */
  'GET /api/v1/friends:nearby': { action: 'friend/get-all-nearby' },

}
