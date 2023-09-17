/// <reference types = "cypress"/>

const baseUrl = Cypress.env('baseUrl') + 'produtos/'

describe('Testa a página de Produtos da Ebac', () => {

    describe('Testa a página de produtos', () => {

        beforeEach(() => {
            cy.visit(baseUrl)
        });

        it('Seleciona um produto da página', () => {
            cy.get('[class = "product-block grid"]')
                .first()
                .click()
            cy.get('.sku_wrapper')
                .should('contain', 'SKU')
        });

        it('Adiciona um produto no carrinho', () => {
            cy.get('[class = "product-block grid"]')
                .first()
                .click()
            cy.get('.button-variable-item-M')
                .click()
            cy.get(':nth-child(2) > .value > .variable-items-wrapper')
                .click()
            cy.get('.single_add_to_cart_button')
                .click()
            cy.get('.woocommerce-message')
                .should('contain', 'foi adicionado no seu carrinho')
        });

        it('Remove um produto do carrinho', () => {
            cy.get('[class = "product-block grid"]')
                .first()
                .click()
            cy.get('.button-variable-item-M')
                .click()
            cy.get(':nth-child(2) > .value > .variable-items-wrapper')
                .click()
            cy.get('.single_add_to_cart_button')
                .click()
            cy.get('.woocommerce-message > .button')
                .click()
            cy.get('.remove > .fa')
                .click()
            cy.get('.woocommerce-message')
                .should('contain', 'removido')
        });
    });
});