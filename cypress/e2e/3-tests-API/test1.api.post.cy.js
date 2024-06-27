const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API POST Requests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should add an available product to the cart", () => {
    const token = localStorage.getItem("user");
    cy.request({
      method: "PUT",
      url: `${UrlApi}/orders/add`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        productId: 5, // ID of an available product
        quantity: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // (OK)
    });

    cy.visit("/cart");
    cy.get('[data-cy="cart-line"]').should("have.length", 1); // Verify if there is 1 product in the cart
  });

  it("should return an error when adding an out-of-stock product to the cart", () => {
    cy.request({
      method: "POST",
      url: `${UrlApi}/orders/add`,
      body: {
        productId: 1, // ID of an out-of-stock product
        quantity: 1,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400); // Bad request
    });

    cy.visit("/cart");
    cy.get('[data-cy="cart-line"]').should("have.length", 0); // 0 products in the cart
  });

  it("should add a review", () => {
    cy.login();
    const token = localStorage.getItem("user");

    cy.request({
      method: "POST",
      url: `${UrlApi}/reviews`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        productId: 1,
        title: "Super",
        comment: "Je l'aime bien, j'achèterai à nouveau !",
        rating: 5,
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // OK
    });

    cy.visit("/reviews");
    cy.get('[data-cy="review-title"]').should("contain.text", "Super");
    cy.get('[data-cy="review-comment"]').should(
      "contain.text",
      "Je l'aime bien, j'achèterai à nouveau !"
    );
    cy.get(
      '[data-cy="review-note"] img[src="assets/images/star-full.png"]'
    ).should("have.length", 5);
  });
});
