describe('Fluxo de Login', () => {
  const validEmail = 'teste@example.com';
  const validPassword = '123456';

  beforeEach(() => {
    cy.visit('/frontend/index.html');
  });

  it('deixa o botão Entrar desabilitado até os campos estarem preenchidos', () => {
    cy.get('[data-testid="login-submit"]').should('be.disabled');
    cy.get('input[name="email"]').type(validEmail);
    cy.get('[data-testid="login-submit"]').should('be.disabled');
    cy.get('input[name="password"]').type(validPassword);
    cy.get('[data-testid="login-submit"]').should('not.be.disabled');
  });

  it('exibe mensagens de obrigatoriedade quando os campos estão vazios', () => {
    cy.get('[data-testid="login-submit"]').should('be.disabled');
    cy.get('#login-form').submit();
    cy.contains('E-mail é obrigatório').should('be.visible');
    cy.contains('Senha é obrigatória').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('realiza login com sucesso', () => {
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('[data-testid="login-submit"]').click();

    cy.url().should('include', '/home');
    cy.contains('Login efetuado com sucesso!').should('be.visible');
    cy.contains('Bem-vindo').should('be.visible');
  });

  it('mantém na página de login com credenciais inválidas', () => {
    cy.get('input[name="email"]').type('errado@example.com');
    cy.get('input[name="password"]').type('senha-errada');
    cy.get('[data-testid="login-submit"]').click();

    cy.url().should('include', '/login');
    cy.contains('Credenciais inválidas').should('be.visible');
  });
});
