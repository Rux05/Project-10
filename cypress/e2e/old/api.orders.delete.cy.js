const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API delete product line from basket test", () => {
    beforeEach(() => {
        cy.login(); 
    });

    it("should delete a product line from the basket", () => {
        const lineId = 1; 

        cy.request({
            method: "PUT",
            url: `${UrlApi}/orders/${lineId}/delete`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("orderLines").that.is.an("array");

            //Verify if the line was eliminated from orderLines
            const deletedLine = response.body.orderLines.find(line => line.id === lineId);
            expect(deletedLine).to.not.exist;
        });
    });

    it("should return an error when deleting a non-existent product line", () => {
        const lineId = 9999; //ID nonexistent line

        cy.request({
            method: "PUT",
            url: `${UrlApi}/orders/${lineId}/delete`,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(404); 
        });
    });

    it("should return an error when not authenticated", () => {
        cy.logout();
        const lineId = 1; 

        cy.request({
            method: "PUT",
            url: `${UrlApi}/orders/${lineId}/delete`,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});