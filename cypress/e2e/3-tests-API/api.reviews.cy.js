const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API reviews test", () => {
    beforeEach(() => {
        cy.login(); 
    });

    it("should get existing reviews", () => {
        cy.request({
            method: "GET",
            url: `${UrlApi}/reviews`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
        });
    });

    it("should add a new review", () => {
        cy.request({
            method: "POST",
            url: `${UrlApi}/reviews`,
            body: {
                title: "Super",
                comment: "Je l'aime bien, j'achèterai à nouveau !",
                rating: 5
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("id");
            expect(response.body.title).to.eq("Super");
            expect(response.body.comment).to.eq("Je l'aime bien, j'achèterai à nouveau !");
            expect(response.body.rating).to.eq(5);
        });
    });

    it("should validate review rating between 1 and 5", () => {
        cy.request({
            method: "POST",
            url: `${UrlApi}/reviews`,
            body: {
                title: "Invalid Rating",
                comment: "This rating is invalid",
                rating: 6
            },
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); 
        });
    });

    it("should not add review without rating", () => {
        cy.request({
            method: "POST",
            url: `${UrlApi}/reviews`,
            body: {
                title: "Title without rating",
                comment: "Comment without rating"
            },
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); 
        });
    });

    it("should not add review without title", () => {
        cy.request({
            method: "POST",
            url: `${UrlApi}/reviews`,
            body: {
                comment: "Comment without title",
                rating: 4
            },
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); 
        });
    });

    it("should not add review without comment", () => {
        cy.request({
            method: "POST",
            url: `${UrlApi}/reviews`,
            body: {
                title: "Title without comment",
                rating: 3
            },
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); 
        });
    });
});