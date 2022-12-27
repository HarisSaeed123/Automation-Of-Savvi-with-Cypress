import selectors from '../fixtures/locators.json'
const { setting, savviDashboard } = selectors.savviBranding
const { customerBtn, addCustomer, editCustomerName, avatar, myColleague, boardsList, collaborators, customerSetting, sidebarButton, sidebarCrossBtn, boardIcon, usersIcon, activityIcon, teamMemberIcon, deleteButton, shareMsg, shareworkspace } = selectors.customer
import msg from '../fixtures/validData.json'
const { workspaceMessage } = msg.customerData
export class Workspace {
    addSavviBrand(selector, value) {
        cy.xpath(setting).click();
        cy.xpath(selector).clear()
        cy.contains(/Please enter your domain/i).should('be.visible')
        cy.xpath(selector).clear()
        cy.xpath(selector).type(value)
        cy.contains('button', 'Save settings').click();
        cy.contains('span', 'Branding saved!').should('be.visible')
        cy.xpath(savviDashboard).click();
    }
    createWorkSpace(selector, value) {
        //Clicking on the Customer button
        cy.xpath(customerBtn).click();
        cy.wait(6000)
        //Verified Add Customer text
        cy.xpath(addCustomer).should("be.visible", "Add customer");
        //Adding the new customer
        cy.xpath(addCustomer).click()
        cy.wait(6000)
        //Add the customer name 
        cy.xpath(selector).type(value)
        //Verify the avatar
        cy.xpath(avatar).should('be.visible')
        //Verified the "List transaction boards" button
        cy.xpath(boardsList).should('be.visible')
        //Verified the "Add collaborators to the customer" button
        cy.xpath(collaborators).should('be.visible')
        //Verified the "Settings" button
        cy.xpath(customerSetting).should('be.visible')
    }
    updateWorkSpace(selector, value) {
        //Verified the customer name
        cy.xpath(editCustomerName).should("be.visible", value);
        //Verified the text List transaction boards, Add collaborators to the customer and Settings
        cy.xpath(boardsList).should('be.visible')
        cy.xpath(collaborators).should('be.visible')
        cy.xpath(customerSetting).should('be.visible')
        //Back to workspace
        cy.xpath(sidebarButton).click()
        //Click on the Customer button in the sidebar
        cy.contains('button', 'Customers').should('be.visible').click()
        //Removes the sidebar
        cy.xpath(sidebarCrossBtn).click()
        //Verified the boards icon, users icon and activity icon on the created workspace
        cy.get(boardIcon).should('be.visible', 'boards')
        cy.get(usersIcon).should('be.visible', 'users')
        cy.get(activityIcon).should('be.visible', 'activity')
        //Verified the team member icons on the workspace
        cy.xpath(teamMemberIcon).should('be.visible')
        //Update the customer name in the workspace
        cy.contains(selector, value).clear().type(value)
        cy.contains(value).click()
    }
    workspaceSetting(selector, value) {
        //Verified the text Customer settings
        cy.contains(/Customer settings/).should('be.visible')
        //Verified the text Customer name
        cy.contains(/Customer name/).should('be.visible')
        //Update the customer name from settings
        cy.xpath(selector).clear()
        cy.xpath(selector).type(value)
    }
    addWorkSpaceBranding(selector, value) {
        cy.xpath(selector).click()
        //Enter the invalid domain in the website address field
        cy.xpath(selector).type("hfadkjhksadfh")
        //Verified the text Savvi could not find that domain
        cy.contains(/Savvi could not find that domain/i).should('be.visible')
        //Verified the text Please enter your domain
        cy.xpath(selector).clear()
        cy.contains(/Please enter your domain/).should
        //Enter the valid domain
        cy.xpath(selector).type(value)
        //Click on the Save customer settings button
        cy.contains(/Save customer settings/i).click()
        //Verified the message Branding saved!
        cy.contains(/Branding saved!/i).should('be.visible')
    }
    workspaceShare(selector, value) {
        cy.xpath(shareworkspace).click()
        //Provide the email
        cy.xpath(selector).type(value + ',')
        //Provide invitation message
        cy.xpath(shareMsg).type(workspaceMessage)
        //Click on the share button
        cy.contains('button', 'Share').should('be.visible').click()
    }
    deleteWorkSpace(selector, value) {
        //Verified the text Customer settings
        cy.contains(/Customer settings/).should('be.visible')
        //Verified the text Customer name
        cy.contains(/Customer name/).should('be.visible')
        //Verified the "My colleagues" icon
        cy.xpath(myColleague).should('be.visible')
        //Verified the "List transaction board" button
        cy.xpath(boardsList).should('be.visible')
        //Verified the "Collaborators" button 
        cy.xpath(collaborators).should('be.visible')
        //Verified the "Setting" button
        cy.xpath(customerSetting).should('be.visible')
        cy.xpath(selector).type(value)
        cy.xpath(deleteButton).click()
        //Verfied the message "Customer successfully deleted"
        cy.contains('span', 'Customer successfully deleted').should('be.visible')
    }
}

export const workspace = new Workspace()