const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API register test", () => {
    it("should register a new user", () => {
        const userData = {
            email: "testuser@test.com",
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

    it("should return error for invalid data", () => {
        const invalidData = {
            missingFields: {
                email: "", // no email
                firstname: "", // no firstname 
                lastname: "", 
                plainPassword: "", 
            },
            invalidFormat: {
                email: "email.invalid", 
                firstname: "A", 
                lastname: "Popa1", 
                plainPassword: "123456", // the password is too weak
            },
        };

        // Testing each case of invalid data
        Object.keys(invalidData).forEach((key) => {
            cy.request({
                method: "POST",
                url: `${UrlApi}/register`,
                body: invalidData[key],
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.not.have.property("token");
            });
        });
    });
});