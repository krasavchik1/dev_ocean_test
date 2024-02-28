export class basePage {
  open_url() {
    cy.visit("/");
    cy.url().should("contain", Cypress.config().baseUrl);
  }
}
