const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");
describe("API login test", () => {
  it("should successfully log in with valid credentials", () => {
    cy.request({
      method: "POST",
      url: `${UrlApi}/login`,
      body: {
        username: Cypress.env("username"),
        password: Cypress.env("username"),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it("should fail to log in with invalid credentials", () => {
    cy.request({
      method: "POST",
      url: `${UrlApi}/login`,
      body: {
        username: "invalid@test.fr",
        password: "wrongpassword",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it("should return an error for missing credentials", () => {
    cy.request({
      method: "POST",
      url: `${UrlApi}/login`,
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
