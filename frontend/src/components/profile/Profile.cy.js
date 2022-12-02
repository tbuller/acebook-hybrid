import Profile from "./Profile";
const navigate = () => {};

describe("Profile", () => {
  it("Calls the /profile endpoint", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/profile", (req) => {
      req.reply({
        statusCode: 200,
      });
    }).as("getProfile");

    //line below has been moved due to cy.intercept not intercepting in time
    cy.mount(<Profile navigate={navigate} />);

    cy.wait("@getProfile").then(() => {
      cy.get('[data-cy="profile"]').should("contain.text", "Profile Page");
    });
  });
});
