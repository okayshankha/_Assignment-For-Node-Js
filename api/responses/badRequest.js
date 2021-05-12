module.exports = function badRequest(optionalData = {}) {

  // Get access to `req` and `res`

  const res = this.res

  if (typeof optionalData === 'string') {
    optionalData = {
      problems: [optionalData]
    }
  }


  let {
    // Define the status code to send in the response.
    statusCodeToSet = 400,

    // Error Code.
    code,

    // Message to display
    message = 'Bad Request.',
    // Problem Statements
    problems: errors

  } = optionalData


  // Define weather it is a validation error or not.
  if ([
    'E_MISSING_OR_INVALID_PARAMS'
  ].includes(code)) {
    statusCodeToSet = 422
  }

  const outputResponseData = {
    error: {
      message,
      errors
    }
  }

  // Set status code and send response data.
  return res.status(statusCodeToSet).send(outputResponseData)

}
