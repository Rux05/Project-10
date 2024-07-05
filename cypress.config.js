const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    UrlApi: "http://localhost:8081",
    username: "test2@test.fr",
    password: "testtest",
  },
  e2e: {
    baseUrl: "http://localhost:8080/#/",
    viewportWidth: 1000,
    viewportHeight: 660,
    defaultCommandTimeout: 10000, //10 sec waiting time before comand
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome",
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports/mochawesome",
        overwrite: false,
        html: false,
        json: true,
      },
    },
    setupNodeEvents(on, config) {
       // implement node event listeners here
    },
  },
});

// reporter: "cypress-multi-reporters",
// reporterOptions: {
//   reporterEnabled: "mochawesome",
//   mochawesomeReporterOptions: {
//     reportDir: "cypress/reports/mochawesome",
//     overwrite: false,
//     html: false,
//     json: true,
//   },
// },

 //   config.reporter = "cypress-multi-reporters";
    //   config.reporterOptions = {
    //     reporterEnabled: "mochawesome",
    //     mochawesomeReporterOptions: {
    //       reportDir: "cypress/reports/mochawesome",
    //       overwrite: false,
    //       html: false,
    //       json: true,
    //     },
    //   };
    //   return config;
    // },