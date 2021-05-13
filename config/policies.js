/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': 'isLoggedIn',


  // Public Access
  'auth/register': true,
  'auth/google/google-auth': true,
  'auth/google/google-auth-callback': true,

  'user/update': true,
  'user/get-all': true,
  'user/get': true,
  'user/un-delete': true,
  'user/delete': true,
}
