describe("press release page", () => {
  beforeEach(() => {
    cy.visit("https://test.easyprwire.com/press-release-distribution");
    // cy.visit("http://localhost:3000/press-release-distribution");
  });

  it("should submit form and redirect to thank you page with id", () => {
    cy.get("#full-name").type("Sanjeet Kumar");
    cy.get("#email").type("sanjeetkazithapa@gmail.com");
    cy.get("#phone").type("+9779843928450");
    cy.get("#website-url").type("http://example.com");
    cy.get("#message").type("This is a test message.");
    cy.get("#contact_form_submit").click();

    // Assert redirect
    cy.url().should("include", "/contact/message-confirmation");
    cy.url().should("include", "id=");
  });

  it("should display validation errors for empty fields", () => {
    cy.get("#contact_form_submit").click();

    // Assert validation errors
    cy.get("#full-name").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("#phone").should("be.visible");
    cy.get("#website-url").should("be.visible");
    cy.get("#message").should("be.visible");
  });

  it("should display validation errors for invalid email", () => {
    cy.get("#full-name").type("Sanjeet Kumar");
    cy.get("#email").type("invalid-email");
    cy.get("#phone").type("+9779843928450");
    cy.get("#website-url").type("http://example.com");
    cy.get("#message").type("This is a test message.");
    cy.get("#contact_form_submit").click();

    // Assert validation errors
    cy.get("#email").should("be.visible");
  });

  it("should display validation errors for invalid phone number", () => {
    cy.get("#full-name").type("Sanjeet Kumar");
    cy.get("#email").type("sanjeetkazithapa@gmail.com");
    cy.get("#phone").type("9843928450");
    cy.get("#website-url").type("http://example.com");
    cy.get("#message").type("This is a test message.");
    cy.get("#contact_form_submit").click();

    // Assert validation errors
    cy.get("#phone").should("be.visible");
  });

  it("should display validation errors for invalid website URL", () => {
    cy.get("#full-name").type("Sanjeet Kumar");
    cy.get("#email").type("sanjeetkazithapa@gmail.com");
    cy.get("#phone").type("+9779843928450");
    cy.get("#website-url").type("invalid-url");
    cy.get("#message").type("This is a test message.");
    cy.get("#contact_form_submit").click();

    // Assert validation errors
    cy.get("#website-url").should("be.visible");
  });
});
