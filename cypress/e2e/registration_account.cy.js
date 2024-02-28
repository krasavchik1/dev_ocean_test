import { basePage } from "../page_object/base_page";
import { loginPage } from "../page_object/login_page";
import { constants } from "../support/constants";

const base_page = new basePage();
const login_page = new loginPage();

describe("registration Form", function () {
  beforeEach(() => {
    base_page.open_url();
    cy.fixture("user_data").then(function (data) {
      this.data = data;
    });
  });

  it("successful registration account", function () {
    login_page.login(this.data.valid_data);
    login_page.checkUrl("include", "/winzor.dev-devocean.pro");
    login_page.checkRegistrationMsg(constants.CORRECT_REGISTRATION_MSG);
  });

  it("registration with incorrect email and password", function () {
    login_page.clickSignIn();
    login_page.clickRegistration();
    login_page.createForm(
      this.data.invalid_email,
      "checkInactiveRegistrationButton"
    );
    login_page.checkIncorrectMsg(constants.INCORRECT_EMAIL_MSG);
    login_page.checkIncorrectMsg(constants.SHORT_PASSWORD_MSG);
  });

  it("checking registration with existed email", function () {
    login_page.login(this.data.valid_data);
    login_page.checkRegistrationMsg(constants.EXIST_EMAIL_MSG);
  });

  it("checking registration with different password", function () {
    login_page.login(this.data.invalid_pswd);
    login_page.checkRegistrationMsg(constants.INCORRECT_PASSWORD_MSG);
  });
});
