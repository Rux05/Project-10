const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("Connexion Tests", () => {
    it("should log in with valid credentials", () => {
        cy.login();
        cy.visit("/");
        cy.contains("Déconnexion"); 
    });

    it("should log out successfully", () => {
        cy.logout(); 
        cy.visit("/"); 
        cy.contains("Connexion"); 
    });
});