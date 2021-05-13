module.exports = {
  // Disable the Morgan hook during running the tests
  hooks: {
    grunt: false,
    'request-logger': false
  },

  // Configure your security settings for production.     
  security: {
    // If this app has CORS enabled(see `config/security.js`) with the
    cors: {},
  },

  // Set the production log level.   
  log: {
    level: 'error'
  },

  http: {
    // The number of milliseconds to cache static assets in production.
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
  },

  // Lift the server on port 80.
  port: parseInt(process.env.PORT),

  // Any custom configurations
  custom: {
    DEFAULT_DATE_FORMAT: process.env.DEFAULT_DATE_FORMAT || 'YYYY-MM-DD',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
  },

  // Mongoose configuration
  mongoose: {
    uri: process.env.MONGO_TEST_CONNECTION_STRING,
    connectionOpts: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  },
};
