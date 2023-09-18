/// <reference types = "cypress"/>

const { faker } = require('@faker-js/faker');
var firstName = faker.person.firstName()
var lastName = faker.person.lastName()
var email = faker.internet.exampleEmail({ firstName: `${firstName}`, lastName: `${lastName}` })
var password = faker.internet.password({ length: 12 })

describe('Testa a página de Pré-cadastro da Ebac', () => {

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    it('Completa o pré-cadastro com sucesso', () => {
        cy.get('#reg_email')
            .type(email)
        cy.get('#reg_password')
            .type(`${password}{enter}`)
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a')
            .click()
        cy.get('#account_first_name')
            .type(firstName)
        cy.get('#account_last_name')
            .type(lastName)
        cy.get('.woocommerce-Button')
            .click()
        cy.get('.woocommerce-message')
            .should('contain', 'modificados com sucesso')
    });

    it('Não aceita cadastro de usuário já registrado', () => {
        cy.get('#reg_email')
            .type(email)
        cy.get('#reg_password')
            .type(`${password}{enter}`)
        cy.get('.woocommerce-error > li')
            .should('contain', 'conta já está registrada')
    });

    it('Não aceita cadastro com email vazio', () => {
        cy.get('#reg_password')
            .type(`${password}{enter}`)
        cy.get('.woocommerce-error > li')
            .should('contain', 'Informe um endereço de e-mail válido')
    });

    it('Não aceita cadastro com senha vazia', () => {
        cy.get('#reg_email')
            .type(`${newEmail}{enter}`)
        cy.get('.woocommerce-error > li')
            .should('contain', 'Digite a senha da conta')
    })

    it('Completa o pré-cadastro com sucesso - usando custom commands', () => {
        let newEmail = faker.internet
            .email()
        cy.preCadastro(newEmail, 'senhaForte123@#', 'Gustavo', 'Tester' )
        cy.get('.woocommerce-message')
            .should('contain', 'modificados com sucesso')
    });
});