const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    UrlApi: "http://localhost:8081",
    username: "test2@test.fr",
    password: "testtest",
  },
  e2e: {
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
