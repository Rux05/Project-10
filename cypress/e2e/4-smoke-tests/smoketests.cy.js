const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("Smoke Tests", () => {
    it("should load the home page", () => {
        cy.visit("/");
        cy.contains("Home"); // Verifică dacă textul "Home" este prezent pe pagina principală
    });

    it("should authenticate with valid credentials", () => {
        cy.visit("/login");
        cy.get("input[name='username']").type("test2@test.fr");
        cy.get("input[name='password']").type("testtest");
        cy.get("button[type='submit']").click();
        cy.contains("Welcome"); // Verifică dacă textul "Welcome" este prezent după autentificare
    });

    it("should return a list of products", () => {
        cy.request({
            method: "GET",
            url: `${UrlApi}/products`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
        });
    });

    it("should add a product to the cart", () => {
        cy.visit("/products");
        cy.get(".product").first().contains("Add to cart").click();
        cy.visit("/cart");
        cy.get(".cart-item").should("have.length", 1);
    });
    it("should register a new user", () => {
        const userData = {
            email: `testuser${Date.now()}@test.com`,
            firstname: "Peter",
            lastname: "Pan",
            plainPassword: "testpassword"
        };

        cy.request({
            method: "POST",
            url: `${UrlApi}/register`,
            body: userData,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id").that.is.a("number");
            expect(response.body).to.have.property("email").that.is.a("string").eq(userData.email);
            expect(response.body).to.have.property("firstname").that.is.a("string").eq(userData.firstname);
            expect(response.body).to.have.property("lastname").that.is.a("string").eq(userData.lastname);
        });
    });
});