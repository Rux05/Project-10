const { expect } = require("chai");

describe("Connexion Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should log in successfully with valid credentials", () => {
    cy.get('[data-cy="nav-link-login"]').click();
    cy.url().should("include", "/login");
    cy.get('[data-cy="login-input-username"]').type(Cypress.env("username"));
    cy.get('[data-cy="login-input-password"]').type(Cypress.env("password"));
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="nav-link-cart"]').should("be.visible");
  });

  it("should display an error with invalid credentials", () => {
    cy.get('[data-cy="nav-link-login"]').click();
    cy.url().should("include", "/login");
    cy.get('[data-cy="login-input-username"]').type("invalid@test.fr");
    cy.get('[data-cy="login-input-password"]').type("wrongpassword");
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="login-errors"]').should("be.visible");
  });
});

// describe("Connexion Tests", () => {
//     it("should log in with valid credentials", () => {
//         cy.login();
//         cy.visit("/");
//         cy.contains("Déconnexion");
//     });

//     it("should log out successfully", () => {
//         cy.logout();
//         cy.visit("/");
//         cy.contains("Connexion");
//     });
// });
