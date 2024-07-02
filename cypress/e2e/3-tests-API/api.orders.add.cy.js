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
    //   cy.request({
    //     method: "PUT",
    //     url: `${UrlApi}/orders/add`,
    //     headers: {
    //       Authorization: `Bearer ${authToken}`,
    //     },
    //     body: {
    //       product: 1, // ID of an out-of-stock product
    //       quantity: 1000,
    //     },
    //     failOnStatusCode: false,
    //   }).then((response) => {
    //     expect(response.status).to.eq(400); // Bad request
    //   });
    //   cy.visit("/cart");
    //   cy.get('[data-cy="cart-line"]').should("have.length", 0); // 0 products in the cart
    // });
    cy.request({
      method: "GET",
      url: `${UrlApi}/products/3`, // product ID
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const productStock = response.body.stock;
      expect(productStock).to.be.a("number").and.to.be.greaterThan(0);

      const requestedQuantity = productStock + 1;
      cy.request({
        method: "PUT",
        url: `${UrlApi}/orders/add`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          product: 3, // product ID
          quantity: requestedQuantity,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400); // Bad request
        expect(response.body).to.have.property("error");
        cy.visit("/cart");
        cy.get('[data-cy="cart-line"]').should("have.length", 0); // 0 products in the cart
      });
    });
  });

  it("should return an error when not authenticated", () => {
    cy.logout();
    cy.request({
      method: "PUT",
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
      expect(response.status).to.eq(401); // Unauthorized
    });
  });
});
