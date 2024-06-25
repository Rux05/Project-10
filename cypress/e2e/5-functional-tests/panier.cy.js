const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("Cart Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should add a product to the cart", () => {
    cy.visit("/products");
    cy.get('[data-cy="product"]')
      .first()
      .find('[data-cy="product-link"]')
      .click();
    cy.url().should("include", "/products/");
    cy.get('[data-cy="detail-product-add"]').should("be.visible").click(); //Ajouter au panier
    cy.visit("/cart");
    cy.get('[data-cy="cart-line"]').should("have.length", 1);
  });

  it("should verify if the stock is reduced after adding to cart", () => {
    cy.visit("/products");
    cy.get('[data-cy="product"]')
      .first()
      .find('[data-cy="product-link"]')
      .click();
    cy.url().should("include", "/products/");
    cy.get('[data-cy="detail-product-add"]').should("be.visible").click();
    cy.visit("/products/{productId}");
    cy.get('[data-cy="detail-product-stock"]')
      .invoke("text")
      .then((stockText) => {
        const initialStock = parseInt(stockText, 10);
        expect(initialStock).to.be.greaterThan(1); // Verifică dacă stocul este mai mare de 1
        cy.get('[data-cy="detail-product-add"]').click();
        cy.visit("/products/{productId}"); // Revizitează pagina produsului pentru a verifica stocul
        cy.get('[data-cy="product-stock"]')
          .invoke("text")
          .then((updatedStockText) => {
            const updatedStock = parseInt(updatedStockText, 10);
            expect(updatedStock).to.eq(initialStock - 1);
          });
      });
  });

  it("should handle invalid quantity inputs", () => {
    cy.visit("/cart");
    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="cart-line-quantity"]')
      .clear()
      .type("-5");
    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="cart-line-update"]')
      .click();
    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="cart-line-quantity"]')
      .should("have.value", "1"); // Verify if the negative value was reseted to 1

    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="cart-line-quantity"]')
      .clear()
      .type("25");
    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="cart-line-update"]')
      .click();
    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="cart-line-quantity"]')
      .should("have.value", "20");
  });

  it("should remove a product from the cart", () => {
    cy.visit("/cart");
    cy.get('[data-cy="cart-line-delete"]').should("be.visible").click();
    cy.get('[data-cy="cart-line"]').should("have.length", 0);
  });
});
