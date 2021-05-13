const { generateKeyPairSync } = require('crypto')
const { writeFileSync, mkdirSync, existsSync } = require('fs')

module.exports = {
  friendlyName: 'Generate RSA Keys',

  description: 'Generate the RSA keys if keys are not present.',

  inputs: {},

  fn: async function (inputs, exits) {
    try {
      const keyDir = `${__dirname}/../../config/keys`
      const publicKeyPath = `${keyDir}/rsa.pub`
      const privateKeyPath = `${keyDir}/rsa.pub`

      // Throw error if JWT_SECRET is not set
      if (!sails.config.custom.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined.')
      }

      // Check if config/keys exists or not
      if (!existsSync(keyDir)) {
        mkdirSync(keyDir)
      }

      // Check if PUBLIC and PRIVATE KEY exists else generate new
      if (existsSync(publicKeyPath) || existsSync(privateKeyPath)) {
        // sails.log.warn("[SKIPPED] Public or private key already exists.");
      } else {
        const result = generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: sails.config.custom.JWT_SECRET,
          },
        })
        const { publicKey, privateKey } = result
        writeFileSync(`${keyDir}/rsa.pub`, publicKey, { flag: 'wx' })
        writeFileSync(`${keyDir}/rsa`, privateKey, { flag: 'wx' })
        sails.log.warn('New public and private key generated.')
      }

      return exits.success(true)
    } catch (error) {
      sails.log.error(error.message)
    }
  },
}
