export class loginPage {
  elements = {
    firstname: () => cy.get("input.v-field__input").eq(0),
    secondname: () => cy.get("input.v-field__input").eq(1),
    email: () => cy.get("input.v-field__input").eq(2),
    password: () => cy.get("input.v-field__input").eq(3),
    conf_password: () => cy.get("input.v-field__input").eq(4),
    sign_in: () => cy.get('[alt="Avatar"]'),
    registration: () => cy.get(".login__form__auth > span"),
    url_verification: () => cy.url(),
    registration_button: () => cy.get(".v-form > .v-btn"),
    registration_massage: () =>
      cy.get(
        "div.v-overlay__content.v-snackbar__wrapper.bg-red.rounded-lg.v-snackbar--variant-elevated"
      ),
    loginBtn: () => cy.get(),
    invalid_msg: () => cy.get(".v-messages__message"),
    reg_msg: () => cy.get(".v-snackbar__content"),
    checkbox: () => cy.get('.v-selection-control__input input[type="checkbox"]')
  };

  checkRegistrationMsg(text) {
    this.elements.reg_msg().should("have.text", text);
    return this
  }

  activateCheckbox(){
    this.elements.checkbox().check();
    return this

  }

  clickSignIn() {
    this.elements.sign_in().click();
    return this;
  }

  clickRegistration() {
    this.elements.registration().click();
    return this;
  }

  createForm(profile) {
    for (const key in profile) {
      this.elements[key]().type(profile[key]);
    }
    this.checkRegistrationButton();
    return this;
  }

  checkRegistrationButton() {
    this.elements.registration_button().should("be.enabled");
    return this;
  }

  checkInactiveRegistrationButton() {
    this.elements.registration_button().should("be.disabled");
    return this;
  }

  clickSubmit() {
    this.elements.registration_button().click();
    return this;
  }

  login(profile) {
    this.clickSignIn()
        .clickRegistration()
        .createForm(profile)
        .activateCheckbox()
        .clickSubmit();
    return this;
  }

  checkUrl(chainers, value) {
    this.elements.url_verification().should(chainers, value);
    return this;
  }

  check_password(text) {
    this.elements.registration_massage().should("have.text", text);
    return this;
  }


  createForm(profile, methodToCall) {
    for (const key in profile) {
      this.elements[key]().clear().type(profile[key]);
    }

    if (methodToCall === "checkRegistrationButton") {
      this.checkRegistrationButton();
    } else if (methodToCall === "checkInactiveRegistrationButton") {
      this.checkInactiveRegistrationButton();
    }

    return this;
  }

  checkRegistrationButton() {
    this.elements.registration_button().should("be.enabled");
    return this;
  }

  checkInactiveRegistrationButton() {
    this.elements.registration_button().should("be.disabled");
    return this;
  }

  checkIncorrectMsg(text) {
    this.elements.invalid_msg().contains(text);
    return this;
  }
}
