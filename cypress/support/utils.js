const { MailSlurp } = require('mailslurp-client');
const mailslurp = new MailSlurp({ apiKey: "1a6c683aaa75c19c58c4cb674c44517260778889425eca87fcec3363118c4516" });

const createInbox = () => {
    return mailslurp.createInbox().then((inbox) => {
        console.log('Created inbox:', inbox);
        return inbox;
    });
};


const waitForLatestEmail = (inboxId) => {
    const timeoutMillis = 30000;
    return mailslurp.waitForLatestEmail(inboxId, timeoutMillis);
};

const saveRegistrationEmail = (emailAddress) => {
    console.log('Saving registration email:', emailAddress);
    Cypress.env('registrationEmail', emailAddress);
};

const getRegistrationEmail = () => {
    const registrationEmail = Cypress.env('registrationEmail');
    console.log('Retrieving registration email:', registrationEmail);
    return registrationEmail;
};


module.exports = {
    createInbox,
    waitForLatestEmail,
    saveRegistrationEmail,
    getRegistrationEmail
};
