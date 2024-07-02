const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API orders test", () => {
  beforeEach(() => {
    cy.login();
  });
  it("should display the list of products from the cart", () => {
    const authToken = localStorage.getItem("user");
    cy.request({
      method: "GET",
      url: `${UrlApi}/orders`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("orderLines");
      expect(response.body.orderLines).to.be.an("array");
    });
  });

  it("should not display the list of products from the cart if not authenticated", () => {
    cy.logout();
    cy.request({
      method: "GET",
      url: `${UrlApi}/orders`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401); //  401 (Unauthorized)
    });
  });
  it("should return a forbidden error when not authorized to view the products from the cart", () => {
    const authToken = "invalid_token";
    cy.request({
      method: "GET",
      url: `${UrlApi}/orders`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401); // 401 (Unauthorized) vs 403 (Forbidden)
    });
  });
});
