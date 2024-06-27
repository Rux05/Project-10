const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");
const username = Cypress.env("username");
const password = Cypress.env("password");

before(() => {
  // Perform login once before running tests
  cy.login(username, password);
});

it("should load the home page", () => {
  cy.visit("/");
  cy.contains("Accueil");
});

it("should return a list of products using authenticated token", () => {
  const token = localStorage.getItem("user");
  cy.request({
    method: "GET",
    url: `${UrlApi}/products`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("array");
  });
});

it("should add a product to the cart", () => {
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
  cy.request({
    method: "GET",
    url: `${UrlApi}/cart`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("array").and.have.lengthOf(1); // Verifică dacă există un singur element în coș
  });
});
// Verify if there is 1 product in the cart
it("should register a new user", () => {
  const userData = {
    email: `testuser${Date.now()}@test.com`,
    firstname: "Peter",
    lastname: "Pan",
    plainPassword: "testpassword",
  };

  cy.request({
    method: "POST",
    url: `${UrlApi}/register`,
    body: userData,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("id").that.is.a("number");
    expect(response.body)
      .to.have.property("email")
      .that.is.a("string")
      .eq(userData.email);
    expect(response.body)
      .to.have.property("firstname")
      .that.is.a("string")
      .eq(userData.firstname);
    expect(response.body)
      .to.have.property("lastname")
      .that.is.a("string")
      .eq(userData.lastname);
  });
});
