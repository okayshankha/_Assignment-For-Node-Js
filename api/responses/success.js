module.exports = function success(optionalData = {}) {

  // Get access to `req` and `res`

  const res = this.res

  if (typeof optionalData === 'string') {
    optionalData = {
      message: optionalData
    }
  }

  const {
    // Define the status code to send in the response.
    statusCodeToSet = 200,

    // Message to display
    message = 'Success.',

    // Login Related Fields
    token,

    // Single Data to be sent to Client
    item,

    // Array of Data to be sent to Client
    items,

    // Pagination Related Fields
    totalItems,
    startIndex,
    itemsPerPage,
  } = optionalData

  let responseItems = null

  if (items) {
    responseItems = items
  } else if (item) {
    responseItems = [item]
  } else if (item === null) {
    responseItems = []
  }

  const outputResponseData = {
    data: {
      message,
      token,
      totalItems,
      startIndex,
      itemsPerPage,
      items: responseItems ?? undefined
    }
  }

  // Set status code and send response data.
  return res.status(statusCodeToSet).send(outputResponseData)

}
