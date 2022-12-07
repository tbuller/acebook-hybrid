describe("Post display", () => {
  before(() => {
    cy.signup("user@email.com", "12345678");
  });

  it("with valid credentials, redirects to '/profile'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#button").click();
    cy.url().should("include", "/postdisplay");
  });
});
