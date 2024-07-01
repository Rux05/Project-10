const { expect } = require("chai");

describe("Connexion Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should log in successfully with valid credentials", () => {
    cy.get('[data-cy="login-input-username"]').type(Cypress.env("username"), {
      force: true,
    });
    cy.get('[data-cy="login-input-password"]').type(Cypress.env("password"), {
      force: true,
    });
    cy.get('[data-cy="login-submit"]').click();
    cy.visit("/");
    cy.url().should("include", "/");
    // cy.get("nav").contains("Mon panier").should("be.visible");
    cy.get('[data-cy="nav-link-cart"]').should("be.visible");
  });

  it("should display an error with invalid credentials", () => {
    cy.get('[data-cy="login-input-username"]').type("invalid@test.fr", {
      force: true,
    });
    cy.get('[data-cy="login-input-password"]').type("wrongpassword", {
      force: true,
    });
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="login-errors"]').should("be.visible");
  });
});
