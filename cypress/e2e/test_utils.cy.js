import { registrationPage } from "../page_object/add_item";
const utils = require("../support/utils");

const registration_page = new registrationPage();

describe("Registration Test", () => {
  let emailAddress;
  let inboxId;

  before(() => {
    cy.fixture("user_data").then(function (data) {
      this.data = data;
    });

    return utils.createInbox().then((inbox) => {
      emailAddress = inbox.emailAddress;
      inboxId = inbox.id;
      utils.saveRegistrationEmail(emailAddress);
      cy.writeFile("email.json", { emailAddress: emailAddress });
    });
  });

  it("going to website", () => {
    cy.visit("https://winzor.dev-devocean.pro/");
  });

  it("authorization btn", () => {
    registration_page.clickSignIn();
    registration_page.clickRegistration();
  });

  it("fill first name", () => {
    registration_page.userName();
  });

  it("fill second name", () => {
    registration_page.userSecondName();
  });

  it("fill password", () => {
    registration_page.userPassword();
  });

  it("fill conf password", () => {
    registration_page.userConfPassword();
  });

  it("fill business email", () => {
    cy.get("input.v-field__input").eq(2).should("exist").type(emailAddress);
  });

  it("registration btn", () => {
    registration_page.clickRegistrationBtn();
  });
  it("insert the otp", () => {
    cy.waitForLatestEmail(inboxId, { count: 2 }).then((emails) => {
      for (let i = 0; i < emails.length; i++) {
        const emailBody = emails[i].body;

        if (emailBody.includes("Verify Email")) {
          cy.log(
            `Найдено письмо с заголовком "Verify Email" в ${i + 1}-м письме.`
          );

          // Открываем письмо
          cy.log(`Пытаемся открыть письмо с ID: ${emails[i].id}`);
          cy.visit(`/inbox/${inboxId}/emails/${emails[i].id}`);

          cy.get(".email").then(($email) => {
            if ($email.length === 0) {
              cy.log("Письмо не загрузилось");
              return;
            }

            cy.get("a")
              .contains("Посилання")
              .then(($link) => {
                if ($link.length === 0) {
                  cy.log("Ссылка в письме не найдена");
                  return;
                }
                const targetLink = $link.attr("href");
                cy.log("Найдена ссылка в письме:", targetLink);

                cy.visit(targetLink);
              });
          });
        } else {
          cy.log(
            `Письмо с заголовком "Verify Email" не найдено в ${i + 1}-м письме.`
          );
        }
      }
    });
  });
});
