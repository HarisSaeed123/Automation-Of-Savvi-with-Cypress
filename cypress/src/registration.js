

export class Registration{
    userInfo(selector, value){
       cy.xpath(selector).clear()
       cy.xpath(selector).type(value)
    }
    // boardDetails(selector, value){
    //     cy.xpath(selector).clear()
    //     cy.xpath(selector).type(value)
    // }
}

export const user = new Registration()