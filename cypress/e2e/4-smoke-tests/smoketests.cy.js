const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");
const username = Cypress.env("username");
const password = Cypress.env("password");

describe("Smoke Tests", () => {
  it("should verify the presence of login fields and buttons", () => {
    cy.visit("/login");
    // cy.get('[data-cy="login-input-username"]').should("exist");
    // cy.get('[data-cy="login-input-password"]').should("exist");
    // cy.get('[data-cy="login-submit"]').should("exist");
    cy.contains("Email");
    cy.contains("Mot de passe");
    cy.get('[data-cy="login-submit"]').should("exist");
  });
  context("when authenticated", () => {
    before(() => {
      // Perform login before running authenticated tests
      cy.login();
    });

    it("should verify the presence of add to cart buttons when logged in", () => {
      cy.visit("/products");
      // Verify if product list is loaded
      cy.get(".list-products .mini-product").should(
        "have.length.greaterThan",
        0
      );
      cy.get(".list-products .mini-product").each(($el, index, $list) => {
        // cy.wrap($el).contains("Ajouter au panier").should("be.visible");
        // cy.wrap($el).find('[data-cy="product-link"]').should("exist");
        cy.wrap($el)
          .find('.add-to-cart [data-cy="product-link"]')
          .should("be.visible")
          .click();
        cy.url().should("include", "/products/");
        cy.contains("Ajouter au panier").should("be.visible");
        // Navigate back to products list to check the next product
        if (index < $list.length - 1) {
          cy.go("back");
          cy.wait(1000); // Wait a moment to ensure the page has navigated back
        }
      });
    });

    it("should verify the presence of product availability field", () => {
      cy.visit("/products");
      cy.get(".list-products .mini-product").each(($el, index, $list) => {
        cy.wrap($el)
          .find('.add-to-cart [data-cy="product-link"]')
          .should("exist")
          .click();
        cy.url().should("include", "/products/");
        cy.get(".stock").should("exist");
        // Navigate back to products list to check the next product
        if (index < $list.length - 1) {
          cy.go("back");
          cy.wait(1000); // Wait a moment to ensure the page has navigated back
        }
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
