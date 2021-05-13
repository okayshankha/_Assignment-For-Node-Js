const moment = require('moment')

module.exports = {

  friendlyName: 'Date format checker',

  description: '',

  inputs: {
    date: { type: 'string', required: true },
    inPast: { type: 'boolean' },
    dateFormat: { type: 'string' }
  },



  fn: async function (inputs) {
    // Get the date string
    const {
      date,
      inPast = false,
      dateFormat = sails.config.custom.DEFAULT_DATE_FORMAT
    } = inputs

    let resultFlag = 1

    const momentDate = moment(date, dateFormat)

    // Check if the expected data format is given or not
    const isValid = (momentDate.format(dateFormat) === date) ? 1 : 0

    resultFlag *= isValid

    if (isValid) {

      // If the date is expected to be in past, check if it is in past
      if (inPast) {
        const today = moment()
        const isBefore = momentDate.isBefore(today) ? 1 : 0
        resultFlag *= isBefore
      }
    }

    return resultFlag ? true : false
  }


}

