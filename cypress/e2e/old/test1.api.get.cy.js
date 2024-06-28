const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API GET Requests", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("should return an error when trying to access confidential user data without being logged in", () => {
    cy.request({
      method: "GET",
      url: `${UrlApi}/orders`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401); //  401 (Unauthorized) or 403 (Forbidden)
    });
  });

  it("should return the list of products in the cart for a logged-in user", () => {
    if (!localStorage.getItem("user")) {
      // If there is no token, we proceed with the login
      cy.login();
    }

    // Takes token from localStorage
    const token = localStorage.getItem("user");
    cy.request({
      method: "GET",
      url: `${UrlApi}/orders`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // OK
      expect(response.body).to.be.an("array");
    });
  });

  it("should return the product details for a specific product", () => {
    const productId = 3;
    cy.request({
      method: "GET",
      url: `${UrlApi}/products/${productId}`,
    }).then((response) => {
      expect(response.status).to.eq(200); // OK
      expect(response.body).to.have.property("id", productId);
    });
  });
});
