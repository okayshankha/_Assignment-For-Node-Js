
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
   * @api {get} /api/v1/users 1. Get All Users
   * @apiName GetAllUser
   * @apiGroup Users
   *
   * @apiSuccessExample Success:
   * 200 OK
   * {
   *     "data": {
   *         "message": "Users fetch successful.",
   *         "items": [
   *             {
   *                 "isActive": true,
   *                 "_id": "609d191b4da09840f084926a",
   *                 "email": "shankhascm96@gmail.com",
   *                 "name": "Shankha",
   *                 "dob": "2000-01-21T00:00:00.000Z",
   *                 "address": "A/4 School Bazar",
   *                 "description": "description",
   *                 "latitude": 22.415687,
   *                 "longitude": 87.326846,
   *                 "createdAt": "2021-05-13T12:18:35.461Z",
   *                 "updatedAt": "2021-05-13T12:18:35.461Z"
   *             }
   *         ]
   *     }
   * }
   *
   * @apiSuccess {Object} data Success Response Object.
   * @apiSuccess {Boolean} data.message User friendly message.
   * @apiSuccess {Boolean} data.items User information
   *
   * @apiDescription Fetch all users
   */
  'GET /api/v1/users': { action: 'user/get-all' },



  /**
   * @api {get} /api/v1/users/:userId 2. Get User By Id
   * @apiName GetUserById
   * @apiGroup Users
   *
   * @apiParam (Path) {String} userId User id.
   *
   * @apiSuccessExample Success:
   * 200 OK
   * {
   *     "data": {
   *         "message": "User fetch successful.",
   *         "items": [
   *             {
   *                 "isActive": true,
   *                 "_id": "609d191b4da09840f084926a",
   *                 "email": "shankhascm96@gmail.com",
   *                 "name": "Shankha",
   *                 "dob": "2000-01-21T00:00:00.000Z",
   *                 "address": "A/4 School Bazar",
   *                 "description": "description",
   *                 "latitude": 22.415687,
   *                 "longitude": 87.326846,
   *                 "createdAt": "2021-05-13T12:18:35.461Z",
   *                 "updatedAt": "2021-05-13T12:18:35.461Z"
   *             }
   *         ]
   *     }
   * }
   *
   * @apiSuccess {Object} data Success Response Object.
   * @apiSuccess {Boolean} data.message User friendly message.
   * @apiSuccess {Boolean} data.items User information
   *
   *
   * @apiDescription Fetch user by id
   */
  'GET /api/v1/users/:userId': { action: 'user/get' },




  /**
   * @api {patch} /api/v1/users/:userId 3. Update User By Id
   * @apiName UpdateUserById
   * @apiGroup Users
   *
   * @apiParam (Path) {String} userId User id.
   *
   * @apiParam (Body) {String} name Name of the User.
   * @apiParam (Body) {String} dob Date of birth of the User.
   * @apiParam (Body) {String} address Address of the User.
   * @apiParam (Body) {String} description Description of the User.
   * @apiParam (Body) {String} latitude Latitude of the User.
   * @apiParam (Body) {String} longitude Longitude of the User.
   *
   * @apiParamExample {json} Request-Example:
   * {
   *   "name": "Shankha",
   *   "dob": "2000-01-21",
   *   "address": "A/4 School Bazar",
   *   "description": "description",
   *   "latitude": 22.416017,
   *   "longitude": 87.326930
   * }
   *
   * @apiSuccessExample Success:
   * 200 OK
   * {
   *     "data": {
   *         "message": "User update successful.",
   *         "items": [
   *             {
   *                 "isActive": true,
   *                 "_id": "609d191b4da09840f084926a",
   *                 "email": "shankhascm96@gmail.com",
   *                 "name": "Shankha",
   *                 "dob": "2000-01-21T00:00:00.000Z",
   *                 "address": "A/4 School Bazar",
   *                 "description": "description",
   *                 "latitude": 22.415687,
   *                 "longitude": 87.326846,
   *                 "createdAt": "2021-05-13T12:18:35.461Z",
   *                 "updatedAt": "2021-05-13T12:18:35.461Z"
   *             }
   *         ]
   *     }
   * }
   *
   * @apiSuccess {Object} data Success Response Object.
   * @apiSuccess {Boolean} data.message User friendly message.
   * @apiSuccess {Boolean} data.items User information
   *
   *
   * @apiDescription Update user by id
   */
  'PATCH /api/v1/users/:userId': { action: 'user/update' },



  /**
   * @api {delete} /api/v1/users/:userId 4. Delete User By Id (Soft Delete)
   * @apiName SoftDeleteUserById
   * @apiGroup Users
   *
   * @apiParam (Path) {String} userId User id.
   *
   * @apiSuccessExample Success:
   * 200 OK
   * {
   *     "data": {
   *         "message": "User delete successful.",
   *         "items": [
   *             {
   *                 "isActive": false,
   *                 "_id": "609d191b4da09840f084926a",
   *                 "email": "shankhascm96@gmail.com",
   *                 "name": "Shankha",
   *                 "dob": "2000-01-21T00:00:00.000Z",
   *                 "address": "A/4 School Bazar",
   *                 "description": "description",
   *                 "latitude": 22.415687,
   *                 "longitude": 87.326846,
   *                 "createdAt": "2021-05-13T12:18:35.461Z",
   *                 "updatedAt": "2021-05-13T12:18:35.461Z"
   *             }
   *         ]
   *     }
   * }
   *
   * @apiSuccess {Object} data Success Response Object.
   * @apiSuccess {Boolean} data.message User friendly message.
   * @apiSuccess {Boolean} data.items User information
   *
   *
   * @apiDescription Soft delete user by id
   */
  'DELETE /api/v1/users/:userId': { action: 'user/delete' },




  /**
   * @api {post} /api/v1/users:undelete/:userId 4. Undo delete User By Id (Soft Delete)
   * @apiName UndoSoftDeleteUserById
   * @apiGroup Users
   *
   * @apiParam (Path) {String} userId User id.
   *
   * @apiSuccessExample Success:
   * 200 OK
   * {
   *     "data": {
   *         "message": "User undo delete successful.",
   *         "items": [
   *             {
   *                 "isActive": false,
   *                 "_id": "609d191b4da09840f084926a",
   *                 "email": "shankhascm96@gmail.com",
   *                 "name": "Shankha",
   *                 "dob": "2000-01-21T00:00:00.000Z",
   *                 "address": "A/4 School Bazar",
   *                 "description": "description",
   *                 "latitude": 22.415687,
   *                 "longitude": 87.326846,
   *                 "createdAt": "2021-05-13T12:18:35.461Z",
   *                 "updatedAt": "2021-05-13T12:18:35.461Z"
   *             }
   *         ]
   *     }
   * }
   *
   * @apiSuccess {Object} data Success Response Object.
   * @apiSuccess {Boolean} data.message User friendly message.
   * @apiSuccess {Boolean} data.items User information
   *
   *
   * @apiDescription Undo soft delete user by id
   */
  'POST /api/v1/users:undelete/:userId': { action: 'user/un-delete' },

}
