
import selector from '../fixtures/locators.json'
import data from '../fixtures/validData.json'
const { boardsList, collaborators, customerSetting } = selector.customer
const {
    addBoard,
    videoCancelBtn,
    startRecordingBtn,
    shareButton,
    editBoardBtn,
    boardViewBtn,
    boardAnalyticsBtn,
    editBoardPageBtns,
    deleteBoardCancelBtn,
    boardDescription,
    cancelBoardButton
} = selector.transactionBoard;
const {description} = data.transactionBoardData
const attachment = 'IT.docx'
const attachment1 = 'softwaretesting.docx'
export class TransactionBoard {
    createBoard(selector, value) {
        //Verified the "List transaction boards", "Add collaborators to the customer" and "Settings" icon
        cy.xpath(boardsList).should('be.visible')
        cy.xpath(collaborators).should('be.visible')
        cy.xpath(customerSetting).should('be.visible')
        //Verified the "Add transaction board" card
        cy.xpath(addBoard).should("be.visible", "Add transaction board");
        //Adding the new transaction board
        cy.xpath(addBoard).click();
        //Verified the text "New transaction board"
        cy.contains(/New transaction board/i).should('be.visible')
        //verified the text "Board details"
        cy.contains(/Board details/i).should('be.visible')
        cy.contains('span', 'Add a title and description which will appear prominently at the top of the board').should('be.visible')
        cy.xpath(selector).type(value)
         //Enter transaction board description
         cy.xpath(boardDescription).type(description)
        // //Verified the "START NEW RECORDING" button
        // cy.contains('span', 'START NEW RECORDING').should('be.visible').click()
        // //Cancel the recording
        // cy.contains('span', 'Cancel').should('be.visible').click()
        // cy.contains('span', 'START NEW RECORDING').should('be.visible').click()
        // //Satrt the recording
        // cy.contains('span', 'Start recording').should('be.visible').click()
        // cy.wait(10000)
        // //Verified the "Save video" button
        // cy.contains('span', 'Save video').should('be.visible').click()
        //Verified the "CANCEL" button
        cy.xpath(cancelBoardButton).should('be.visible').click()
        //Verified the text
        cy.contains('h2', 'Cancel board creation').should('be.visible')
        cy.contains('p', 'The board will not be saved. Are you sure you want to quit creating the board?').should('be.visible')
        //Verified the 'Delete Board' button
        cy.contains('button', 'Delete Board').should('be.visible')
        //Verified the 'Continue Editing' button
        cy.contains('button', 'Continue Editing').should('be.visible').click()
        //Verified and click on the "Continue" button
        cy.contains('button', 'Continue').should('be.visible').click()
        //Verified the text
        cy.contains('h6', 'Board assets').should('be.visible')
        cy.contains('span', 'Add one or more files to share. Valid file formats include .pdf, .ppt, .pptx, .doc, .docx, .mp4, .avi, .mov, .webm, .mkv, .wmv, .png and .jpeg').should('be.visible')
        //Add document inside the transaction board
        cy.contains('div', 'drag & drop').attachFile({
            filePath: attachment,
            encodeing: 'utf-8'
        }, {
            force: true,
            subjectType: "drag-n-drop"
        })
        cy.wait(5000)
        cy.contains('div', 'drag & drop').attachFile({
            filePath: attachment1,
            encodeing: 'utf-8'
        }, {
            force: true,
            subjectType: "drag-n-drop"
        })
        cy.wait(5000)
        cy.contains('button', 'Continue').should('be.visible').click()
    }
   
    recordVideos(selector, value) {
        //Verified and click on the "New personal video" button
        cy.contains('button', 'New personal video').should('be.visible').click()
        //Verified and Click on the "Cancel" button to cancel the personal recording
        cy.xpath(videoCancelBtn).should('be.visible').click()
        //Click on the "New personal video" button
        cy.contains('button', 'New personal video').click()
        //Verified and click on the "Start recording" button
        cy.xpath(startRecordingBtn).should('be.visible').click()
        cy.wait(10000)
        //Verified and click on the "Save video" button
        cy.contains(/save video/i).should('be.visible').click()
        cy.wait(10000)
    }
    shareBoard(selector, value) {
        //Verified the "Share" button on the board view page
        cy.contains(shareButton, 'Share').should('be.visible').click()
        cy.xpath(selector).type(`${value},`)
    }
    deleteBoard(boardName) {
        //Click on the Edit button
        cy.xpath(editBoardBtn).click()
        //Verified the name of the transaction board on the Edit board page
        cy.contains(boardName).should('be.visible')
        //Verified the board View button on the board Edit page
        cy.xpath(boardViewBtn).should('be.visible')
        //Verified the board Edit button on the board Edit page
        cy.xpath(editBoardBtn).should('be.visible')
        //Verified the Analytics button on the board Edit page
        cy.xpath(boardAnalyticsBtn).should('be.visible')
        //Verified and click on the "Delete Board" button
        cy.contains(editBoardPageBtns, 'Delete board').should('be.visible').click()
        //Verified the text 'Delete board"
        cy.contains('h2', 'Delete board').should('be.visible')
        //Verified the text "This is not reversible. Are you sure you want to delete the board?"
        cy.contains('p', 'This is not reversible. Are you sure you want to delete the board?').should('be.visible')
        //Verified the "Cancel" button
        cy.xpath(deleteBoardCancelBtn).should('be.visible').click()
        cy.contains(editBoardPageBtns, 'Delete board').should('be.visible').click()
        //Verified and click on the "Delete board" button
        cy.contains('button', 'Delete board').should('be.visible').click()
    }
}

export const board = new TransactionBoard()