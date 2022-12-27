///<reference types = "cypress"/>
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
  setCustomerBranding,
  sidebarButton,
  sidebarCrossBtn
} = selector.customer;
const { brandDomain, customerName, } = data.customerData;
const customer = `${customerName}${Math.ceil(Math.random() * 3000)}`;
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
  it("A logged in user can create a workspace", () => {
    workspace.createWorkSpace(editCustomerName, customer)
    //Click on the Sidebar button
    cy.xpath(sidebarButton).click()
    //Click on the Customer button in the sidebar
    cy.contains('a', 'Customers').should('be.visible').click()
  });
  it('A logged in user can add the workspace branding on the settings page', () => {
    cy.wait(6000)
    cy.contains('a', customer).should('be.visible').click()
    cy.xpath(customerSetting).should('be.visible').click()
    workspace.addWorkSpaceBranding(setCustomerBranding, brandDomain)
  })
});
