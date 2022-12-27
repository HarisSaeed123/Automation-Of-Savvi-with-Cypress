const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 5000,
  // requestTimeout: 5000,
  // responseTimeout: 10000,
  // pageLoadTimeout: 60000,
  env: {
    MAILOSAUR_API_KEY: 'ZcanOWUuFJyiak7W',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://app.savvi.co/'
  },
})
