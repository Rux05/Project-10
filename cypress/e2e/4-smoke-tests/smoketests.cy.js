const { expect } = require("chai");

describe("Smoke Tests", () => {
  it("should verify the presence of login fields and buttons", () => {
    cy.visit("/login");
    cy.url().should("include", "/login");
    cy.contains("Email");
    cy.contains("Mot de passe");
    cy.get('[data-cy="login-submit"]').should("exist");
  });
  context("when authenticated", () => {
    before(() => {
      // Perform login before running authenticated tests
      cy.login();
    });

    it("should verify the presence of add to cart buttons when logged in", () => {
      cy.visit("/products");
      cy.url().should("include", "/products");
      // Verify if product list is loaded
      cy.get(".list-products .mini-product").should(
        "have.length.greaterThan",
        0
      );
      cy.get(".list-products .mini-product").each(($el, index, $list) => {
        // cy.wrap($el).contains("Ajouter au panier").should("be.visible");
        // cy.wrap($el).find('[data-cy="product-link"]').should("exist");
        cy.wrap($el);
        // .find('.add-to-cart [data-cy="product-link"]')
        cy.get('.add-to-cart button[data-cy="product-link"]').first().click();
        cy.url().should("include", "/products/");
        cy.contains("Ajouter au panier").should("be.visible");
        // Navigate back to products list to check the next product
        if (index < $list.length - 1) {
          cy.go("back");
          cy.wait(1000); // Wait a moment to ensure the page has navigated back
        }
      });
    });

    it("should verify the presence of product availability field", () => {
      cy.visit("/products");
      cy.url().should("include", "/products");
      cy.get(".list-products .mini-product").each(($el, index, $list) => {
        cy.wrap($el);
        cy.get('.add-to-cart button[data-cy="product-link"]').first().click();
        cy.url().should("include", "/products/");
        cy.get(".stock").should("exist");
        // Navigate back to products list to check the next product
        if (index < $list.length - 1) {
          cy.go("back");
          cy.wait(1000); // Wait a moment to ensure the page has navigated back
        }
      });
    });
  });
});
