const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API get products test", () => {
    beforeEach(() => {
        cy.login(); 
    });

    it("should retrieve the list of products", () => {
        cy.request({
            method: "GET",
            url: `${UrlApi}/products`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array'); 

            response.body.forEach(product => {
                expect(product).to.have.property('id');
                expect(product).to.have.property('name').that.is.a('string');
                expect(product).to.have.property('availableStock').that.is.a('number');
                expect(product).to.have.property('skin').that.is.a('string');
                expect(product).to.have.property('aromas').that.is.a('string');
                expect(product).to.have.property('ingredients').that.is.a('string');
                expect(product).to.have.property('description').that.is.a('string');
                expect(product).to.have.property('price').that.is.a('number');
                expect(product).to.have.property('picture').that.is.a('string');
                expect(product).to.have.property('varieties').that.is.a('number');
            });
        });
    });
    it("should retrieve a random product", () => {
        cy.request({
            method: "GET",
            url: `${UrlApi}/products/random`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').and.to.have.lengthOf(1);
            
            const product = response.body[0];
            expect(product).to.have.property('id');
            expect(product).to.have.property('name').that.is.a('string');
            expect(product).to.have.property('availableStock').that.is.a('number');
            expect(product).to.have.property('skin').that.is.a('string');
            expect(product).to.have.property('aromas').that.is.a('string');
            expect(product).to.have.property('ingredients').that.is.a('string');
            expect(product).to.have.property('description').that.is.a('string');
            expect(product).to.have.property('price').that.is.a('number');
            expect(product).to.have.property('picture').that.is.a('string');
            expect(product).to.have.property('varieties').that.is.a('number');
        });
    });
    it("should retrieve product details by ID", () => {
        const productId = 1; 
        cy.request({
            method: "GET",
            url: `${UrlApi}/products/${productId}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id').that.is.a('number');
            expect(response.body).to.have.property('name').that.is.a('string');
            expect(response.body).to.have.property('availableStock').that.is.a('number');
            expect(response.body).to.have.property('skin').that.is.a('string');
            expect(response.body).to.have.property('aromas').that.is.a('string');
            expect(response.body).to.have.property('ingredients').that.is.a('string');
            expect(response.body).to.have.property('description').that.is.a('string');
            expect(response.body).to.have.property('price').that.is.a('number');
            expect(response.body).to.have.property('picture').that.is.a('string');
            expect(response.body).to.have.property('varieties').that.is.a('number');
        });
    });

    it("should return 404 for non-existent product ID", () => {
        const nonExistentId = 9999; 
        cy.request({
            method: "GET",
            url: `${UrlApi}/products/${nonExistentId}`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message').that.includes('Produit inexistant');
        });
    });
});