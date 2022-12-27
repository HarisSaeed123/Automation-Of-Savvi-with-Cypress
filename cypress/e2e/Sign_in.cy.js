///<reference types= "cypress"/>
import selector from '../fixtures/locators.json'
import { user } from '../src/registration'
const { signInBtn, email } = selector.Signin
const { otp } = selector.Signup
const serverId = "evrbqhbc"
let code
describe("Sign in module", () => {
    it("Verify that the user can be logged in with valid credentials", () => {
        cy.visit('/')
        cy.xpath(signInBtn).click()
        user.userInfo(email, 'taimur.aamer949@evrbqhbc.mailosaur.net')
        cy.contains(/continue/i).click()
        cy.mailosaurGetMessage(serverId, {
            sentTo: 'taimur.aamer985@xwm0cppj.mailosaur.net'
        }).then(userId => {
            code = userId.text.codes[0].value
            user.userInfo(otp, code)
        })
    })

   
})

