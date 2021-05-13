/**
 * @apiDefine PaginationDefaultQueryParams
 *
 * @apiParam (Query) {Number} startIndex StartIndex.
 * @apiParam (Query) {Number} itemsPerPage ItemsPerPage.
 *
 */








/**
 * @apiDefine ValidationError
 * @apiErrorExample Validation Error
 *  422 Unprocessable
 *  {
 *      "error": {
 *          "message": "Received incoming request (`{METHOD} /api/v1/xxx/xxx`), but could not run action.",
 *          "errors": [
 *              "Invalid \"{field_name}\":\n  · Value ('xyz') was not passed the validation criteria"
 *          ]
 *      }
 *  }
 *
 */


/**
 *  @apiDefine Unauthorized
 *  @apiErrorExample Unauthorized
 *  401 Unauthorized
 *  {
 *      "error": {
 *          "message": "Unauthorized."
 *      }
 *  }
 */



/**
 *  @apiDefine BadRequest
 *  @apiErrorExample Bad Request
 *  400 Bad Request
 *  {
 *      "error": {
 *          "message": "Bad Request.",
 *          "errors": [
 *              "Some error message."
 *          ]
 *      }
 *  }
 */



/**
 *  @apiDefine Conflict
 *  @apiErrorExample Conflict
 *  409 Conflict
 *  {
 *      "error": {
 *          "message": "Bad Request.",
 *          "errors": [
 *              "Some error message."
 *          ]
 *      }
 *  }
 */

