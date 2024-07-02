const { expect } = require("chai");

describe("Cart Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should add a product to the cart", () => {
    cy.visit("/products");
    cy.get('.add-to-cart [data-cy="product-link"]').first().click();
    cy.url().should("include", "/products/");
    cy.get('[data-cy="detail-product-add"]').should("be.visible").click(); //Ajouter au panier
    cy.visit("/cart");
    cy.get('[data-cy="cart-line"]').should("have.length", 1);
  });

  it("should verify if the stock is reduced after adding to cart", () => {
    cy.visit("/products");
    cy.get('.add-to-cart [data-cy="product-link"]').first().click();
    cy.url().should("include", "/products/");
    cy.get('[data-cy="detail-product-stock"]')
      .invoke("text")
      .then((stockNumber) => {
        const initialStock = Number(stockNumber.trim());
        expect(initialStock).to.be.greaterThan(1);
        cy.get('[data-cy="detail-product-add"]').click();
        // cy.visit("/products/{productId}");
        cy.url().should("include", "/products/");
        cy.get('[data-cy="product-stock"]')
          .invoke("text")
          .then((updatedStockNumber) => {
            const updatedStock = Number(updatedStockNumber.trim());
            expect(updatedStock).to.eq(initialStock - 1); // Verify if stock was reduced
          });
      });
  });

  it("should handle invalid quantity inputs", () => {
    cy.visit("/cart");
    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="cart-line-quantity"]')
      .clear()
      .type("-5{enter}");
    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="cart-line-quantity"]')
      .should("have.value", "1"); // Verify if the negative value was reset to 1

    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="cart-line-quantity"]')
      .clear()
      .type("120{enter}");
    cy.get('[data-cy="cart-line"]')
      .first()
      .find('[data-cy="quantity-error"]')
      .should("be.visible"); // Check if an error message is displayed

    cy.get('[data-cy="add-to-cart-button"]').should("have.attr", "disabled"); // Check if the add to cart button is disabled
  });

  it("should remove a product from the cart", () => {
    cy.visit("/cart");
    cy.get('[data-cy="cart-line"]').should("have.length.greaterThan", 0);
    cy.get('[data-cy="cart-line-delete"]').should("be.visible").click();
    cy.get('[data-cy="cart-line"]').should("have.length", 0);
  });
  it("should handle adding a quantity greater than available stock", () => {
    cy.visit("/products");
    cy.get('.add-to-cart [data-cy="product-link"]').first().click();
    cy.url().should("include", "/products/");
    cy.get('[data-cy="detail-product-stock"]')
      .invoke("text")
      .then((stockNumber) => {
        const initialStock = Number(stockNumber.trim());
        expect(initialStock).to.be.greaterThan(1);
        cy.get('[data-cy="detail-product-add"]').click();
      });
  });
});
