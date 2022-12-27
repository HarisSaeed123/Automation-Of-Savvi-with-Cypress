///<reference types="cypress"/>
import selector from "../fixtures/locators.json";
import { user } from "../src/registration";
import { workspace } from "../src/workspace";
import { board } from "../src/transactionBoard";
import data from "../fixtures/validData.json";
const { email, signInBtn } = selector.Signin;
const { emailId } = data.signIn;
const { otp } = selector;
const {
    editCustomerName,
    sidebarButton
} = selector.customer;
const { boardTitle, boardViewBtn, editBoardBtn, boardAnalyticsBtn, shareBoardEmailAddress, shareMsg, shareButton, sharedWithMeBtn} = selector.transactionBoard
const { customerName, } = data.customerData;
const customer = `${customerName}${Math.ceil(Math.random() * 3000)}`;
const { boardName, invitedEmail, message } = data.transactionBoardData;
const transactionBoardName = `${boardName}${Math.ceil(Math.random() * 3000)}`;
const serverId = "frrzzj35";
const attachment = "IT.docx";
const attachment1 = "softwaretesting.docx";
describe('Transaction Board E2E Testing', () => {
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
    it('A logged in user can create the transaction board', () => {
        //Verified the customer name on the /create-board page
        cy.contains(customer).should('be.visible')
        board.createBoard(boardTitle, transactionBoardName)
    })
    it('A logged in user can view the created transaction board', () => {
        //Verified the text "Board successfully created"
        cy.contains('h6', 'Board successfully created').should('be.visible')
        //Verified the text 'Continue to view your board' 
        cy.contains('span', 'Continue to view your board').should('be.visible')
        //Verified the "CANCEL" button on the "Board completion" page
        cy.contains('button', 'Cancel').should('be.visible')
        cy.contains('button', 'Continue').should('be.visible').click()
        //Verified the board View button
        cy.xpath(boardViewBtn).should('be.visible')
        //Verified the board Edit button 
        cy.xpath(editBoardBtn).should('be.visible')
        //Verified the Analytics button
        cy.xpath(boardAnalyticsBtn).should('be.visible')
        //Verifed the name of the the transaction board on the board view page
        cy.contains(transactionBoardName).should('be.visible')
        //Verified the attachments on the board view page
        cy.contains('h2', attachment).should('be.visible')
        cy.contains('h2', attachment1).should('be.visible')
        //Verified the "Share" button on the board view page
        cy.contains(shareButton, 'Share').should('be.visible')
    })
    it('A logged in user can share the transaction board', () => {
        board.shareBoard(shareBoardEmailAddress, invitedEmail)
        cy.xpath(shareMsg).type(message)
        cy.contains('button', 'Share').should('be.visible').click()
        cy.mailosaurGetMessage(serverId, {
            sentTo: invitedEmail,
        }).then((userId) => {
            cy.visit(userId.text.links[0].href, {failOnStatusCode:false})
        });
        cy.contains('a', 'Sign in').click()
        user.userInfo(email, invitedEmail)
        cy.contains(/continue/i).click();
        cy.mailosaurGetMessage(serverId, {
            sentTo: invitedEmail,
        }).then((code) => {
            cy.xpath(otp).type(code.html.codes[0].value)
        })
        //Verified the "Sidebar" button
        cy.xpath(sidebarButton).should('be.visible').click()
        //Verified the "Shared with me" button
        cy.xpath(sharedWithMeBtn).should('be.visible').click()
        cy.contains(transactionBoardName).should('be.visible').click()

    })
})










