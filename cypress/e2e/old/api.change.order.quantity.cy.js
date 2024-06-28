const { expect } = require("chai");

const UrlApi = Cypress.env("UrlApi");

describe("API change order quantity test", () => {
    let orderLineId;

    beforeEach(() => {
        cy.login().then(() => {
            cy.request({
                method: "POST",
                url: `${UrlApi}/orders`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "firstname": "Ion",
                    "lastname": "Popescu",
                    "address": "123 Street",
                    "zipCode": "12345",
                    "city": "Testcity"
                }
            }).then((orderResponse) => {
                expect(orderResponse.status).to.eq(200);

                cy.request({
                    method: "PUT",
                    url: `${UrlApi}/orders/${orderResponse.body.id}/add`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "product": 1,  
                        "quantity": 2
                    }
                }).then((addResponse) => {
                    expect(addResponse.status).to.eq(200);
                    orderLineId = addResponse.body.orderLines[0].id; 
                });
            });
        });
    });

    it("should update the quantity of a product in the order", () => {
        const authToken = localStorage.getItem('token');
        cy.request({
            method: "PUT",
            url: `${UrlApi}/orders/${orderLineId}/change-quantity`,
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: {
                "quantity": 3
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("quantity").that.equals(3);
        });
    });

    it("should return an error if the order line is not found", () => {
        const authToken = localStorage.getItem('token');
        const invalidOrderLineId = 9999; // invalid ID 
        cy.request({
            method: "PUT",
            url: `${UrlApi}/orders/${invalidOrderLineId}/change-quantity`,
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: {
                "quantity": 3
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});