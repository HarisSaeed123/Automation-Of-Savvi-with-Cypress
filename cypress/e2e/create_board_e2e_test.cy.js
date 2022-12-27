///<reference types="cypress"/>
import selector from "../fixtures/locators.json";
import { user } from "../src/registration";
import { workspace } from "../src/workspace";
import { board } from "../src/transactionBoard";
import { edit } from "../src/edit_transaction_board";
import data from "../fixtures/validData.json";
const { email, signInBtn } = selector.Signin;
const { emailId } = data.signIn;
const { otp } = selector;
const {
    editCustomerName,
} = selector.customer;
const { boardTitle, boardViewBtn, editBoardBtn, boardAnalyticsBtn, shareButton, youTubeLink, articleLink, editBoardPageBtns, videoTitle, videoDescription } = selector.transactionBoard
const {editDescription, editBoardTitle, editDocumentTitle, editDocDescription} = selector.editTransactionBoard 
const { customerName, } = data.customerData;
const customer = `${customerName}${Math.ceil(Math.random() * 3000)}`;
const { boardName, youTubeVideo1, article1,  description1, title, description, documentDescription } = data.transactionBoardData;
const transactionBoardName = `${boardName}${Math.ceil(Math.random() * 3000)}`;
const serverId = "frrzzj35";
const attachment = "IT.docx"
const attachment1 = "softwaretesting.docx"
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
})










