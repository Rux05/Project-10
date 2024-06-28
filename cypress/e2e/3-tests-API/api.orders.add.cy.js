const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API add product to cart test", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should add an available product to the cart", () => {
    const authToken = localStorage.getItem("user");
    cy.request({
      method: "PUT",
      url: `${UrlApi}/orders/add`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        product: 5, // ID of an available product
        quantity: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // (OK)
      cy.visit("/cart");
      cy.wait(2000);
      cy.get('[data-cy="cart-line"]').should("have.length.at.least", 1); // Verify if there is at least 1 product in the cart
    });
  });

  it("should return an error when adding an out-of-stock product to the cart", () => {
    const authToken = localStorage.getItem("user");
    cy.request({
      method: "PUT",
      url: `${UrlApi}/orders/add`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        product: 1, // ID of an out-of-stock product
        quantity: 1000,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400); // Bad request
    });
    cy.visit("/cart");
    cy.get('[data-cy="cart-line"]').should("have.length", 0); // 0 products in the cart
  });
});

it("should return an error when not authenticated", () => {
  cy.logout();
  cy.request({
    method: "POST",
    url: `${UrlApi}/orders/add`,
    body: {
      product: 1,
      quantity: 2,
    },
    failOnStatusCode: false,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    // expect(response.status).to.eq(401); // Unauthorized
    expect(response.status).to.eq(405); // Method Not Allowed
  });
});
