const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API add product to basket test", () => {
    beforeEach(() => {
        cy.login(); 
    });

    it("should add a product to the basket", () => {
        cy.request({
            method: "PUT",
            url: `${UrlApi}/orders/add`,
            body: {
                product: 1, 
                quantity: 2
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("orderLines").that.is.an("array");
            
            // Verify if the added product is found in orderLines
            const addedProduct = response.body.orderLines.find(line => line.product.id === 1);
            expect(addedProduct).to.exist;
            expect(addedProduct.quantity).to.eq(2);
        });
    });

    it("should return an error when adding a product out of stock", () => {
        cy.request({
            method: "PUT",
            url: `${UrlApi}/orders/add`,
            body: {
                product: 1, // Exemple of ID product
                quantity: 1000 
            },
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(400); 
        });
    });

    it("should return an error when not authenticated", () => {
        cy.logout();
        cy.request({
            method: "PUT",
            url: `${UrlApi}/orders/add`,
            body: {
                product: 1, 
                quantity: 2
            },
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});