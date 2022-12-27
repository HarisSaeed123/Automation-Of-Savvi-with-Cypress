///<reference types = "cypress"/>
import selector from "../fixtures/locators.json";
import { user } from "../src/registration";
import { workspace } from "../src/workspace";
import data from "../fixtures/validData.json";
import invalidData from "../fixtures/invalidData.json"
const { email, signInBtn } = selector.Signin;
const { emailId } = data.signIn;
const { otp } = selector;
const { savviBrand, setting } = selector.savviBranding
const { invalidDomain } = invalidData
const {brandDomain} = data.customerData
const serverId = "frrzzj35";

describe("Workspace end to end testing", () => {
    it("Verify that the user can be logged in with valid credentals", () => {
        cy.visit("/");
        cy.xpath(signInBtn).click();
        user.userInfo(email, emailId);
        cy.contains(/continue/i).click();
        cy.mailosaurGetMessage(serverId, {
            sentTo: emailId,
        }).then((userId) => {
            cy.xpath(otp).type(userId.html.codes[0].value)
        });
    });
    it('Verify the validation message for invalid branding domain', () => {
        cy.xpath(setting).click();
        cy.xpath(savviBrand).clear()
        cy.contains(/Please enter your domain/i).should('be.visible')
        cy.xpath(savviBrand).clear()
        cy.xpath(savviBrand).type(invalidDomain)
        cy.wait(3000)
        cy.contains('h4', 'Savvi could not find that domain').should('be.visible')
    })
    it("A logged in user can add the savvi brand", () => {
        workspace.addSavviBrand(savviBrand, brandDomain)
    })
});