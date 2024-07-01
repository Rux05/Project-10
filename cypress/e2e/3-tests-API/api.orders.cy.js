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
      expect(response.body).to.be.an("array");
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
  //   it("should create and validate an order", () => {
  //     const authToken = localStorage.getItem("user");
  //     cy.request({
  //       method: "POST",
  //       url: `${UrlApi}/orders`,
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: {
  //         firstname: "Ion",
  //         lastname: "Popescu",
  //         address: "123 Street",
  //         zipCode: "12345",
  //         city: "Testcity",
  //       },
  //     }).then((response) => {
  //       expect(response.status).to.eq(200);
  //       expect(response.body).to.have.property("id");
  //       expect(response.body.firstname).to.eq("Ion");
  //       expect(response.body.lastname).to.eq("Popescu");
  //       expect(response.body.address).to.eq("123 Street");
  //       expect(response.body.zipCode).to.eq("12345");
  //       expect(response.body.city).to.eq("Testcity");
  //       expect(response.body).to.have.property("validated").that.is.true;
  //       expect(response.body).to.have.property("orderLines").that.is.an("array");
  //     });
  //   });

  //   it("should return an error if there is no ongoing order", () => {
  //     const authToken = localStorage.getItem("token");
  //     cy.request({
  //       method: "POST",
  //       url: `${UrlApi}/orders`,
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: {
  //         firstname: "Ion",
  //         lastname: "Popescu",
  //         address: "123 Street",
  //         zipCode: "12345",
  //         city: "Testcity",
  //       },
  //       failOnStatusCode: false,
  //     }).then((response) => {
  //       expect(response.status).to.eq(404);
  //     });
  //   });
});
