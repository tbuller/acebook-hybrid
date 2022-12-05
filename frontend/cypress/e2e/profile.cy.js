describe("Navigating to profile", () => {
  before(() => {
    cy.signup("user@email.com", "12345678");
  });

  it("with valid credentials, redirects to '/profile'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#root > :nth-child(2)").click();
    cy.url().should("include", "/profile");
  });

  it("With valid credentials, navigates between /feed and /profile", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#root > :nth-child(2)").click();
    cy.url().should("include", "/profile");

    cy.get("root > :nth-child(2)").click();
    cy.url().should("include", "/posts");
  })
});
