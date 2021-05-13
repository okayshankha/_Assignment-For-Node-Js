const supertest = require('supertest')

describe('Auth', () => {
  const completeUserRegisterPayload = {
    'email': 'shankhascm96+1@gmail.com',
    'name': 'Shankha',
    'dob': '2000-01-21',
    'address': 'A/4 School Bazar',
    'description': 'description'
  }

  const userRegisterPayloadMissingOptionalFields = {
    'email': 'shankhascm96+2@gmail.com',
    'name': 'Shankha',
    'dob': '2000-01-21'
  }

  const userRegisterPayloadMissingNameField = {
    'email': 'shankhascm96+3@gmail.com',
    'dob': '2000-01-21'
  }
  const userRegisterPayloadMissingDobField = {
    'email': 'shankhascm96+4@gmail.com',
    'name': 'Shankha',
  }

  const userRegisterPayloadWithInvalidDateFormat = {
    'email': 'shankhascm96+5@gmail.com',
    'name': 'Shankha',
    'dob': '21-01-21'
  }

  const userRegisterPayloadWithDateInFuture = {
    'email': 'shankhascm96+6@gmail.com',
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
