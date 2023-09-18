const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/'
  }
});
