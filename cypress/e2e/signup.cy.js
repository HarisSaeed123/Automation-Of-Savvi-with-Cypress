///<reference types = "cypress"/>
import selector from '../fixtures/locators.json'
const { firstName, lastName, emailAddress, signupBtn,  emailField} = selector.Signup
const {otp} = selector
import data from '../fixtures/validData.json'
import invalidData from '../fixtures/invalidData.json'
import { user } from '../src/registration'
const { FirstName, LastName, Email } = data
const {invalidFirstName, invalidLastName, invalidEmail} = invalidData
const [email, domain] = Email.split('@')
const emailId = `${email}${Math.ceil(Math.random() * 1000)}@${domain}`
const serverId = "frrzzj35"
describe("Signup Module", () => {
    beforeEach('', () => {
        cy.visit('/')
        
    })
    //Email Verification by using mailosaur
    it.only("Verify that the user can be signed up with valid credentials", () => {
        user.userInfo(firstName, FirstName)
        user.userInfo(lastName, LastName)
        user.userInfo(emailAddress, emailId)
        cy.get(signupBtn).click()
        cy.mailosaurGetMessage(serverId, {
            sentTo: emailId
        }).then(userId => {
            console.log(userId)
            user.userInfo(otp, userId.html.codes[0].value) 
        })

    })

    it('Verify that the user cannot be signed up with invalid credentials', () => {
        user.userInfo(firstName, `@${FirstName}`)
        user.userInfo(lastName, `@${LastName}`)
        user.userInfo(emailAddress, invalidEmail) 
        cy.get(signupBtn).click() 
        user.userInfo(firstName, '12345')
        user.userInfo(lastName, '6789')
        user.userInfo(emailAddress, '444taimur.aamer.@savvi.co')
        cy.get(signupBtn).click()
        user.userInfo(firstName, invalidFirstName)
        user.userInfo(lastName, invalidLastName)
        user.userInfo(emailAddress, 'taimur.aamer444savvi.co')
        cy.get(signupBtn).click()
        user.userInfo(firstName, '@#$%^')
        user.userInfo(lastName, '@#$%^')
        user.userInfo(emailAddress, 'taimur.aamer444@savvico')
        cy.get(signupBtn).click()
        user.userInfo(firstName, `123${FirstName}`)
        user.userInfo(lastName, `345${LastName}`)
        user.userInfo(emailAddress, 'taimur.aamer444@savvi.')
        cy.get(signupBtn).click()
    })

    it("Verify that the user cannot be signed up without providing the credentials", () =>{
        user.userInfo(firstName, '{enter}')
        user.userInfo(lastName, '{enter}')
        user.userInfo(emailAddress, '{enter}')
        cy.get(signupBtn).click()
        user.userInfo(firstName, '{enter}')
        user.userInfo(lastName, LastName)
        user.userInfo(emailAddress, emailId)
        cy.get(signupBtn).click()
        user.userInfo(firstName, FirstName)
        user.userInfo(lastName, `{enter}`)
        user.userInfo(emailAddress, emailId)
        cy.get(signupBtn).click()
        user.userInfo(firstName, FirstName)
        user.userInfo(lastName, LastName)
        user.userInfo(emailAddress, '{enter}')
        cy.get(signupBtn).click()

    })

    it('Verify that the user cannot be signed up with the existing email', () =>{
        user.userInfo(firstName, FirstName)
        user.userInfo(lastName, LastName)
        user.userInfo(emailAddress, emailId)
        cy.get(signupBtn).click()
    })
   
})