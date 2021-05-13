const jwt = require('jsonwebtoken')
const { readFileSync } = require('fs')

module.exports = {
  friendlyName: 'JWT Token helper',

  description:
    'Generate and Verify a JWT with private and public key respectively.',

  inputs: {
    type: {
      description: 'Name or type of the custom function (cf) to be executed.',
      type: 'string',
      required: true,
    },
    payload: {
      description: 'Payload to sign JWT or token to verify',
      type: 'json',
    },
  },

  fn: async function (inputs, exits) {
    const keyPaths = {
      privateKey: `${__dirname}/../../config/keys/rsa`,
      publicKey: `${__dirname}/../../config/keys/rsa.pub`,
    }

    // Custom Functions
    const cf = {
      /**
       * Create a signed JWT with the rsa private key.
       * @param {*} payload
       * @returns token
       */
      generateToken: (payload) => {

        const { _id: _user } = payload

        const privateKey = readFileSync(keyPaths.privateKey)
        const jwtPayload = {
          // sub: payload.id,
          roles: payload.roles
        }
        return jwt.sign(
          jwtPayload,
          { key: privateKey, passphrase: sails.config.custom.JWT_SECRET },
          {
            algorithm: 'RS256',
            expiresIn: sails.config.custom.JWT_EXPIRY,
            subject: _user
          }
        )
      },

      /**
       * Verify the token with rsa public key.
       * @param {string} token
       * @returns
       */
      verifyToken: async (payload) => {
        try {
          const { token } = payload
          const publicKey = readFileSync(keyPaths.publicKey)
          return await jwt.verify(token, publicKey, {
            algorithm: 'RS256',
          })
        } catch (error) {
          sails.log.error(error)
          return null
        }
      },

      /**
       * Get token user
       * @param {string} token
       * @returns
       */
      getUser: async (payload) => {
        const verification = await cf.verifyToken(payload)
        if (verification) {
          const user = await User.getById(verification.sub)
          delete user?.password
          return user
        }
        return null
      },
    }

    if (_.isFunction(cf[inputs.type])) {
      return exits.success(await cf[inputs.type](inputs.payload))
    }

    throw new Error('Invalid Action.')
  },
}