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
    const authToken = localStorage.getItem("user");
    cy.request({
      method: "POST",
      url: `${UrlApi}/reviews`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        title: "Super",
        comment: "Je l'aime bien, j'achèterai à nouveau !",
        rating: 5,
      },
    }).then((response) => {
      expect(response.status).to.eq(200); //201 the server has successfully processed the request, the new resource has been created
      expect(response.body).to.have.property("id");
      expect(response.body.title).to.eq("Super");
      expect(response.body.comment).to.eq(
        "Je l'aime bien, j'achèterai à nouveau !"
      );
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
        rating: 6,
      },
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should not add review without rating", () => {
    cy.request({
      method: "POST",
      url: `${UrlApi}/reviews`,
      body: {
        title: "Title without rating",
        comment: "Comment without rating",
      },
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should not add review without title", () => {
    cy.request({
      method: "POST",
      url: `${UrlApi}/reviews`,
      body: {
        comment: "Comment without title",
        rating: 4,
      },
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should not add review without comment", () => {
    cy.request({
      method: "POST",
      url: `${UrlApi}/reviews`,
      body: {
        title: "Title without comment",
        rating: 3,
      },
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should not add review with title longer than allowed", () => {
    const longTitle = "a".repeat(256); // Exemple of title longer than 100 characters
    cy.request({
      method: "POST",
      url: `${UrlApi}/reviews`,
      body: {
        title: longTitle,
        comment: "Valid comment",
        rating: 3,
      },
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should not add review with comment longer than allowed", () => {
    const longComment = "a".repeat(501); // Exemple of comment longer than 500 characters
    cy.request({
      method: "POST",
      url: `${UrlApi}/reviews`,
      body: {
        title: "Valid title",
        comment: longComment,
        rating: 3,
      },
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
