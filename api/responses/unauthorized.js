module.exports = function unauthorized(optionalData = {}) {
  // Get access to `req` and `res`

  const res = this.res

  // Define the status code to send in the response.
  const statusCodeToSet = 401

  const {
    // Message to display
    message = 'Unauthorized.',
  } = optionalData

  const outputResponseData = {
    error: {
      message,
    }
  }

  // Set status code and send response data.
  return res.status(statusCodeToSet).send(outputResponseData)
}
