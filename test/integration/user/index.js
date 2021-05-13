const supertest = require('supertest')

describe('User', () => {

  let user = null

  const completeUserUpdatePayload = {
    'name': 'Shankha',
    'dob': '2000-01-21',
    'address': 'A/4 School Bazar',
    'description': 'description'
  }

  const userUpdatePayloadMissingOptionalFields = {
    'name': 'Shankha2',
    'dob': '2000-01-21'
  }

  const userUpdatePayloadMissingOptionalFieldsAndNameField = {
    'dob': '2005-01-21'
  }


  before(async () => {
    // Create a new user we can start testing on
    user = new sails.models.user({
      name: 'Shankhadeep Das',
      dob: Date('1996-01-21')
    })
    await user.isValid()
    await user.save()
  })



  describe('# Update', async () => {
    it('Should update user data', async () => {
      const userId = user._id.toString()
      await supertest(sails.hooks.http.app)
                .patch(`/api/v1/users/${userId}`)
                .send(completeUserUpdatePayload)
                .expect(200)
    })

    it('Should error as no data provided to update', async () => {
      const userId = user._id.toString()
      await supertest(sails.hooks.http.app)
                .patch(`/api/v1/users/${userId}`)
                .expect(400)
    })

    it('Should update user data (missing optional fields)', async () => {
      const userId = user._id.toString()
      const result = await supertest(sails.hooks.http.app)
                .patch(`/api/v1/users/${userId}`)
                .send(userUpdatePayloadMissingOptionalFields)
                .expect(200)

      const { data: { items } } = result.body
      if (items.length !== 1 || items[0].name !== 'Shankha2') {
        throw Error('Update is not working properly')
      }
    })

    it('Should update user data (missing name field)', async () => {
      const userId = user._id.toString()
      const result = await supertest(sails.hooks.http.app)
                .patch(`/api/v1/users/${userId}`)
                .send(userUpdatePayloadMissingOptionalFieldsAndNameField)
                .expect(200)

      const { dob: reqDob } = userUpdatePayloadMissingOptionalFieldsAndNameField

      const { data: { items } } = result.body
      if (
        items.length !== 1 ||
                items[0].dob !== (new Date(reqDob)).toISOString()
      ) {
        throw Error('Update is not working properly')
      }
    })


  })



})
