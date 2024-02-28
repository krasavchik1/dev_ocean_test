const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://winzor.dev-devocean.pro/',
    watchForFileChanges: false,
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  responseTimeout: 30000,
  viewportWidth: 2000,
  viewportHeight: 900,
  testIsolation: false,
  },
});
