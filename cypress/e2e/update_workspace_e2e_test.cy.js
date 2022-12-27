//<reference types = "cypress"/>
import selector from "../fixtures/locators.json";
import { user } from "../src/registration";
import { workspace } from "../src/workspace";
import data from "../fixtures/validData.json";
const { email, signInBtn } = selector.Signin;
const { emailId } = data.signIn;
const { otp } = selector;
const {
    editCustomerName,
    customerSetting,
    setCustomerName,
} = selector.customer;
const {customerName, } = data.customerData;
const customer = `${customerName}${Math.ceil(Math.random() * 3000)}`;
const serverId = "frrzzj35";
describe("Update workspace end to end testing", () => {
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
    it("A logged in user can create a workspace", () => {
        workspace.createWorkSpace(editCustomerName, customer)
    });
    it('A logged in user can update the workspace', () => {
        workspace.updateWorkSpace('h4', customer)
    })
    it('A logged in user can update the workspace in the settings', () => {
        //Click on the setting button
        cy.xpath(customerSetting).click()
        workspace.workspaceSetting(setCustomerName, 12345)
        workspace.workspaceSetting(setCustomerName, '@@')
        workspace.workspaceSetting(setCustomerName, " ")
        workspace.workspaceSetting(setCustomerName, "{enter}")
        workspace.workspaceSetting(setCustomerName, customer)
    })
})