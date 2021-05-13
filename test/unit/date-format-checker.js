describe('Date Format Checker', () => {


  it('Should return true for valid past date format', async () => {
    const isValid = await sails.helpers.dateFormatChecker.with({ date: '2000-01-21' })
    if(!isValid){
      throw Error('Data validator is not working properly.')
    }
  })

  it('Should return true for valid future date format', async () => {
    const isValid = await sails.helpers.dateFormatChecker.with({ date: '2060-01-21' })
    if(!isValid){
      throw Error('Data validator is not working properly.')
    }
  })

  it('Should return true for valid past date format with ("inPast": true)', async () => {
    const isValid = await sails.helpers.dateFormatChecker.with({ date: '2000-01-21', inPast: true })
    if(!isValid){
      throw Error('Data validator is not working properly.')
    }
  })

  it('Should return false for valid future date format with ("inPast": true)', async () => {
    const isValid = await sails.helpers.dateFormatChecker.with({ date: '2060-01-21', inPast: true })
    if(isValid){
      throw Error('Data validator is not working properly.')
    }
  })

  it('Should return false invalid date format (default format specified in the env)', async () => {
    const isValid = await sails.helpers.dateFormatChecker.with({ date: '20-01-21' })
    if(isValid){
      throw Error('Data validator is not working properly.')
    }
  })


})