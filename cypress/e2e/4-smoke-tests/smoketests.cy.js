const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");
const username = Cypress.env("username");
const password = Cypress.env("password");

describe("Smoke Tests", () => {
  it("should verify the presence of login fields and buttons", () => {
    cy.visit("/login");
    cy.get('[data-cy="login-input-username"]').should("be.visible");
    cy.get('[data-cy="login-input-password"]').should("be.visible");
    cy.get('[data-cy="login-submit"]').should("be.visible");
  });
  context("when authenticated", () => {
    before(() => {
      // Perform login before running authenticated tests
      cy.login();
    });

    it("should verify the presence of add to cart buttons when logged in", () => {
      cy.visit("/products");
      cy.get(".product").each(($el) => {
        // cy.wrap($el).contains("Ajouter au panier").should("be.visible");
        cy.wrap($el)
          .find('[data-cy="detail-product-add"]')
          .should("be.visible");
      });
    });

    it("should verify the presence of product availability field", () => {
      cy.visit("/products");
      cy.get(".product").each(($el) => {
        cy.wrap($el)
          .find('[data-cy="detail-product-stock"]')
          .should("be.visible");
      });
    });
  });
});

// it("should add a product to the cart", () => {
//   const token = localStorage.getItem("user");
//   cy.request({
//     method: "PUT",
//     url: `${UrlApi}/orders/add`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: {
//       productId: 5, // ID of an available product
//       quantity: 1,
//     },
//   }).then((response) => {
//     expect(response.status).to.eq(200); // (OK)
//   });
//   cy.request({
//     method: "GET",
//     url: `${UrlApi}/cart`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((response) => {
//     expect(response.status).to.eq(200);
//     expect(response.body).to.be.an("array").and.have.lengthOf(1); // Verifică dacă există un singur element în coș
//   });
// });
// // Verify if there is 1 product in the cart
// it("should register a new user", () => {
//   const userData = {
//     email: `testuser${Date.now()}@test.com`,
//     firstname: "Peter",
//     lastname: "Pan",
//     plainPassword: "testpassword",
//   };

//   cy.request({
//     method: "POST",
//     url: `${UrlApi}/register`,
//     body: userData,
//     failOnStatusCode: false,
//   }).then((response) => {
//     expect(response.status).to.eq(200);
//     expect(response.body).to.have.property("id").that.is.a("number");
//     expect(response.body)
//       .to.have.property("email")
//       .that.is.a("string")
//       .eq(userData.email);
//     expect(response.body)
//       .to.have.property("firstname")
//       .that.is.a("string")
//       .eq(userData.firstname);
//     expect(response.body)
//       .to.have.property("lastname")
//       .that.is.a("string")
//       .eq(userData.lastname);
//   });
// });
// });
