/// <reference types = "cypress"/>

const baseUrl = Cypress.env('baseUrl') + '/my-account/'
const validUsername = 'aluno_ebac@teste.com'
const validPassword = 'teste@teste.com'

describe('Testa a página de Login da Ebac', () => {

    beforeEach(() => {
        cy.visit(baseUrl)
    });

    it('Faz login com sucesso', () => {
        cy.get('#username')
            .type(validUsername)
        cy.get('#password')
            .type(`${validPassword}{enter}`)
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)')
            .should('contain', 'Olá')
    });

    it('Exibe mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username')
            .type('usuario@invalido.com')
        cy.get('#password')
            .type(`qualquerSenha{enter}`)
        cy.get('.woocommerce-error > li')
            .should('contain', 'e-mail desconhecido')
    });

    it('Exibe mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username')
            .type(validUsername)
        cy.get('#password')
            .type(`qualquerSenha{enter}`)
        cy.get('.woocommerce-error > li')
            .should('contain', 'Perdeu a senha?')
    });

    it('Faz logout com sucesso', () => {
        cy.get('#username')
            .type(validUsername)
        cy.get('#password')
            .type(`${validPassword}{enter}`)
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)')
            .should('contain', 'Olá')
        cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2) > a')
            .click()
        cy.url()
            .should('eq', 'http://lojaebac.ebaconline.art.br/')
    });

    it('Envia com sucesso e-mail de recuperação de senha', () => {
        cy.get('.lost_password > a')
            .click()
        cy.get('#user_login')
            .type(validUsername)
        cy.get('.woocommerce-Button')
            .click()
        cy.get('.woocommerce-message')
            .should('contain', 'redefinição de senha')
    });
});