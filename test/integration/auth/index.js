const supertest = require('supertest')

describe('Auth', () => {
  const completeUserRegisterPayload = {
    'name': 'Shankha',
    'dob': '2000-01-21',
    'address': 'A/4 School Bazar',
    'description': 'description'
  }

  const userRegisterPayloadMissingOptionalFields = {
    'name': 'Shankha',
    'dob': '2000-01-21'
  }

  const userRegisterPayloadMissingNameField = {
    'dob': '2000-01-21'
  }
  const userRegisterPayloadMissingDobField = {
    'name': 'Shankha',
  }

  const userRegisterPayloadWithInvalidDateFormat = {
    'name': 'Shankha',
    'dob': '21-01-21'
  }

  const userRegisterPayloadWithDateInFuture = {
    'name': 'Shankha',
    'dob': '2120-01-21'
  }


  describe('# Register', async () => {
    it('Should store new user data', async () => {
      await supertest(sails.hooks.http.app)
                .post('/api/v1/auth/register')
                .send(completeUserRegisterPayload)
                .expect(201)
    })

    it('Should store new user data (Optional fields are missing)', async () => {
      await supertest(sails.hooks.http.app)
                .post('/api/v1/auth/register')
                .send(userRegisterPayloadMissingOptionalFields)
                .expect(201)
    })

    it('Should give validation errors (name missing)', async () => {
      await supertest(sails.hooks.http.app)
                .post('/api/v1/auth/register')
                .send(userRegisterPayloadMissingNameField)
                .expect(422)
    })

    it('Should give validation errors (dob missing)', async () => {
      await supertest(sails.hooks.http.app)
                .post('/api/v1/auth/register')
                .send(userRegisterPayloadMissingDobField)
                .expect(422)
    })


    it('Should give validation errors (invalid dob format)', async () => {
      await supertest(sails.hooks.http.app)
                .post('/api/v1/auth/register')
                .send(userRegisterPayloadWithInvalidDateFormat)
                .expect(422)
    })

    it('Should give validation errors (dob is in future)', async () => {
      await supertest(sails.hooks.http.app)
                .post('/api/v1/auth/register')
                .send(userRegisterPayloadWithDateInFuture)
                .expect(422)
    })

  })



})
