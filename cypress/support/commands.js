// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:8081/login",
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    localStorage.setItem("user", response.body.token);
  });
});

Cypress.Commands.add("logout", () => {
  localStorage.removeItem("user");
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
