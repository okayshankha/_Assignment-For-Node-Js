module.exports = function invalidMongoId(optionalData = {}) {

  // Get access to `req` and `res`

  const res = this.res

  if (typeof optionalData === 'string') {
    optionalData = {
      problems: [optionalData]
    }
  }

  // Define the status code to send in the response.
  const statusCodeToSet = 422

  const {

    // Message to display
    message = 'Invalid mongo id.',

    // Problem Statements
    problems: errors

  } = optionalData

  const outputResponseData = {
    error: {
      message,
      errors,
    }
  }

  // Set status code and send response data.
  return res.status(statusCodeToSet).send(outputResponseData)

}
