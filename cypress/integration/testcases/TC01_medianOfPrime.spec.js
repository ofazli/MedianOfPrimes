/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('Testing median of primes', ()=>{
    const locators = {
        home_txt : () => cy.get('.app-container > .mainContainer > h1'),
        submit_btn : () => cy.contains('Submit'),
        number_value : () => cy.get('input[type="number"]'),
        resul_text : () => cy.get('h2')
    }

    var max_value = 10000000
    var over_max_value = 10000012
    var max_value_result = 4751053

    beforeEach (() => {  
        cy.visit('http://localhost:3000')
    })

    it('Verify the name of the application in text format ', () => {
  
        locators.home_txt().should('contain', 'median')
        //basligi degil icerigini assersion islemi yapilacak
    
        
    });
    it('The user presses the submit button without entering a number ', () => {
        cy.intercept('GET', '/api/', {
            statusCode: 200,
            data: {},
          })
        locators.submit_btn().click()
        
       cy.get('.app-container > .mainContainer >form >span').should('be.visible')   
    });

    it('The user enter the number 10 and the result shows as 3,5', () => {

        locators.number_value().type('10')
        locators.submit_btn().click()
        locators.resul_text().should('contain', '3,5')
        
    });
    it('The user enter the number 18 and the result shows as 7', () => {
        locators.number_value().type('18')
        locators.submit_btn().click()
        locators.resul_text().should('contain', '7')
        
    });
    it('Should the user enter a special character throw an error', () => {
        // cy.intercept('GET', '/api/', {
        //     statusCode: 200,
        //     data: {},
        //   })
        locators.number_value().type('a')
        locators.submit_btn().click()
        locators.resul_text().should('have.text', 'Please enter a number')
     
    });

    it('Should the user enter a maximum number of 10000000 and see the result 4751053 in the result section', () => {
        
        locators.number_value().type(max_value)
        locators.submit_btn().click()
        locators.resul_text().should('contain', max_value_result)
        
    });

    it('Should the user enter a more than the maximum value gets an error message ', () => {
        locators.number_value().type(over_max_value)
        locators.submit_btn().click()
        cy.on('window:alert', (str) => {
            //Mocha assertions
            expect(str).to.equal('Number exceeds limit')
        })
        
    });

    it('Should the user enter a maximum number after press the up arrow and give an error message', () => {
        locators.number_value().type(max_value)
        for (let index = 1; index < 5; index++) {
            locators.number_value().type('{uparrow}')
        }
        locators.resul_text().should('have.text', 'Number exceeds limit')    
    });

})