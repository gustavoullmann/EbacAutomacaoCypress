/// <reference types = "cypress"/>

describe('Testa o menu de endereços do usuário', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
        cy.login('aluno_ebac@teste.com', 'teste@teste.com')
    });

    it('Deve fazer cadastro de endereço de faturamento com sucesso', () => {
        
    });
});