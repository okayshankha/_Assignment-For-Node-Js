module.exports = function serverError(optionalData) {

  // Get access to `req` and `res`

  const res = this.res

  let statusCodeToSet = 500

  const {
    // Message to display
    message = 'Internal Server Error.',

    code,

    // Problem Statements
    errors,

    // Stack Trace
    stack,
  } = optionalData

  // Define weather it is a validation error or not.
  if ([
    'E_MISSING_OR_INVALID_PARAMS',
    11000
  ].includes(code)) {
    statusCodeToSet = 422
  }


  const outputResponseData = {
    error: {
      message,
      code,
      errors: errors ?? [message],
      stack: (process.env.NODE_ENV !== 'production') ? stack : undefined
    }
  }

  // Set status code and send response data.
  return res.status(statusCodeToSet).send(outputResponseData)

}
