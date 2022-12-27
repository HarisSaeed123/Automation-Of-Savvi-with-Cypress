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
const {editDescription, editBoardTitle} = selector.editTransactionBoard 
const { customerName } = data.customerData;
const customer = `${customerName}${Math.ceil(Math.random() * 3000)}`;
const { boardName, youTubeVideo1, article1,  description1, title, description } = data.transactionBoardData;
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
    it('A logged in user can edit the transaction board', () => {
        //Click on the Edit button
        cy.xpath(editBoardBtn).click()
        //Verified the name of the transaction board on the Edit board page
        cy.contains(transactionBoardName).should('be.visible')
        //Enter Number in the transaction baord name field
        edit.editBoardDetails(editBoardTitle, '12345')
        //Enter characters in the transaction board name field
        edit.editBoardDetails(editBoardTitle, '@#$%*')
        //Enter Space in the transaction board name field
        edit.editBoardDetails(editBoardTitle, " ")
        //Enter alphabets in the transaction board name field
        edit.editBoardDetails(editBoardTitle, 'Test Board')
        //Leave the transaction board field empty
        edit.editBoardDetails(editBoardTitle, '{enter}')
        //Enter the name of the transaction board in the board name field
        edit.editBoardDetails(editBoardTitle, transactionBoardName)
        //Verified the board View button on the board Edit page
        cy.xpath(boardViewBtn).should('be.visible')
        //Verified the board Edit button on the board Edit page
        cy.xpath(editBoardBtn).should('be.visible')
        //Verified the Analytics button on the board Edit page
        cy.xpath(boardAnalyticsBtn).should('be.visible')
        //Verified the "Share" button on the board Edit page
        cy.contains(editBoardPageBtns, 'Share').should('be.visible')
        //Verified the "Delete Board" button
        cy.contains(editBoardPageBtns, 'Delete board').should('be.visible')
        //Edit the transaction board description
        edit.editBoardDetails(editDescription, description1)
        // //Verified the "Record" button
        // cy.contains(editBoardPageBtns, 'Record video').should('be.visible').click()
        // //Verified the "Cancel" button on the recording video pages
        // cy.contains('span', 'Cancel').should('be.visible').click()
        // cy.contains(editBoardPageBtns, 'Record video').should('be.visible').click()
        // //Start recording
        // cy.contains('span', 'Start recording').should('be.visible').click()
        // cy.wait(10000)
        // cy.contains('span', 'Save video').should('be.visible').click()
        // edit.editBoardDetails(videoTitle, title)
        // edit.editBoardDetails(videoDescription, description)
        // cy.contains('span', 'Publish Recording').should('be.visible').click()
    })
    it('A logged in user can add the youTube video and article on the edit board page', () =>{
         //Verified the "Add article" button on the board edit page
         cy.contains(editBoardPageBtns, 'Add article').should('be.visible').click()
         //Add article on the board edit page
         edit.editArticle(articleLink, article1)
         cy.contains('button', 'Add').click()
         cy.wait(3000)
         //Verified the "Add YouTube video" button on the board edit page
         cy.contains(editBoardPageBtns, 'Add YouTube video').should('be.visible').click()
         // //Add youTube video on the board edit page
         edit.editYouTubeVideo(youTubeLink, youTubeVideo1)
         cy.contains('button', 'Add').click()
         cy.wait(3000)
         //Verified the "Record video" button on the board Edit page
         cy.contains(editBoardPageBtns, 'Record video').should('be.visible')
         //Verified the assets on the "Edit board" page
         cy.contains('span', attachment).should('be.visible')
         cy.contains('span', attachment1).should('be.visible')
         cy.contains('span', 'Article section').should('be.visible')
         cy.contains('span', 'Why Software Testing?').should('be.visible')
    })
})










