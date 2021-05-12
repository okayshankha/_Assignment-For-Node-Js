module.exports = function notFound(optionalData = {}) {

  // Get access to `req` and `res`

  const res = this.res

  console.log(optionalData)

  if (typeof optionalData === 'string') {
    optionalData = {
      problems: [optionalData]
    }
  }

  // Define the status code to send in the response.
  let statusCodeToSet = 404

  const {

    // Message to display
    message = 'Not Found.',
    // Problem Statements
    problems: errors

  } = optionalData


  const outputResponseData = {
    error: {
      message,
      errors
    }
  }

  // Set status code and send response data.
  return res.status(statusCodeToSet).send(outputResponseData)

}

