///<reference types="cypress"/>
import { workspace } from '../src/workspace';
import { board } from '../src/transactionBoard';
import { user } from '../src/registration';
import selector from '../fixtures/locators.json'
import data from '../fixtures/validData.json'
const { email, signInBtn } = selector.Signin;
const { emailId } = data.signIn;
const { otp } = selector;
const {
    editCustomerName,
    worskpaceShareEmail,
} = selector.customer;
const {boardTitle, boardViewBtn, editBoardBtn, boardAnalyticsBtn, shareButton } = selector.transactionBoard
const { boardName, invitedEmail} = data.transactionBoardData
const { customerName } = data.customerData;
const customer = `${customerName}${Math.ceil(Math.random() * 3000)}`;
const transactionBoardName = `${boardName}${Math.ceil(Math.random() * 3000)}`;
const serverId = "frrzzj35";
const attachment = "IT.docx";
const attachment1 = "softwaretesting.docx"
describe('Share Workspace Module', () => {
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
        cy.contains('button', 'CANCEL').should('be.visible')
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
    it('A logged in user can share the workspace', () => {
        let link;
        cy.xpath(editBoardBtn).click()
        workspace.workspaceShare(worskpaceShareEmail, invitedEmail)
        cy.mailosaurGetMessage(serverId, {
            sentTo: invitedEmail,
        }).then((userId) => {
            link = userId.html.links[0].href
            cy.visit(link)
        });
        cy.contains('a', 'Sign in').click()
        user.userInfo(email, invitedEmail)
        cy.contains(/continue/i).click();
        cy.mailosaurGetMessage(serverId, {
            sentTo: invitedEmail,
        }).then((code) => {
            cy.xpath(otp).type(code.html.codes[0].value)
        })
    })
})
