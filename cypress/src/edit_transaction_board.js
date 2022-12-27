
export class Edit_Transaction_Board{
    editContent(selector, value){
        cy.xpath(selector).type(value)
    }
    editBoardDetails(selector, value){
        cy.xpath(selector).clear()
        cy.xpath(selector).type(value)
    }
    editYouTubeVideo(selector, value){
        cy.xpath(selector).type(value)
    }
    editArticle(selector, value){
        cy.xpath(selector).type(value)
    }
    addComment(selector, value){
        cy.xpath(selector).type(value)
        cy.contains('span', 'Comment').should('be.visible').click()
    }
}

export const edit = new Edit_Transaction_Board()