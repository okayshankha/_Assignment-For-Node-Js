module.exports = async function (req, res, proceed) {

  const { headers } = req

  if (headers?.authorization) {
    const { authorization } = headers
    const splittedString = authorization.split(' ')

    if (splittedString?.length) {
      let token
      if (splittedString[0] === 'Bearer') {
        token = splittedString[1]
      }

      req.user = await sails.helpers.tokenAuth.with({
        type: 'getUser',
        payload: {
          token,
        },
      })

      if (req.user) {return proceed()}
    }
  }

  // Otherwise, this request did not come from a logged-in user.
  return res.unauthorized()
}