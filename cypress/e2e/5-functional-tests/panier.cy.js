const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("Cart Tests", () => {
    beforeEach(() => {
        cy.login(); 
    });

    it("should add a product to the cart", () => {
        cy.visit("/products");
        cy.get('[data-cy="product"]').first().find('[data-cy="product-link"]').click();
        cy.url().should('include', '/products/{productId}'); 
        cy.get('[data-cy="detail-product-add"]').click(); //Ajouter au panier
        cy.visit("/cart");
        cy.get('[data-cy="cart-line"]').should("have.length", 1);
    });

    it("should change the quantity of a product in the cart", () => {
        cy.visit("/cart");
        cy.get('[data-cy="cart-line"]').first().find('[data-cy="cart-line-quantity"]').clear().type("2").blur(); // Change quantity to 2
        cy.get('[data-cy="cart-line"]').first().find('[data-cy="cart-line-quantity"]').should("have.value", "2"); // Verify new quantity
    });

    it("should remove a product from the cart", () => {
        cy.visit("/cart");
        cy.get('[data-cy="cart-line-delete"]').should('be.visible').click();
        cy.get('[data-cy="cart-line"]').should("have.length", 0);
    });
});