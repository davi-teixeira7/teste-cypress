const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.querySelector('[data-testid="login-submit"]');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const loginMessage = document.getElementById('login-message');
const homeMessage = document.getElementById('home-message');
const loginView = document.getElementById('login-view');
const homeView = document.getElementById('home-view');
const form = document.getElementById('login-form');

const API_BASE_URL = 'http://localhost:3001';

const clearFieldErrors = () => {
  emailError.textContent = '';
  passwordError.textContent = '';
};

const clearStatusMessages = () => {
  loginMessage.textContent = '';
  homeMessage.textContent = '';
};

const updateButtonState = () => {
  const hasEmail = emailInput.value.trim().length > 0;
  const hasPassword = passwordInput.value.trim().length > 0;
  submitButton.disabled = !(hasEmail && hasPassword);
};

const showLoginView = () => {
  loginView.hidden = false;
  homeView.hidden = true;
  history.replaceState({}, '', '/login');
};

const showHomeView = (message) => {
  loginView.hidden = true;
  homeView.hidden = false;
  homeMessage.textContent = message || 'Login efetuado com sucesso!';
  history.pushState({}, '', '/home');
};

const showRequiredMessages = () => {
  if (!emailInput.value.trim()) {
    emailError.textContent = 'E-mail é obrigatório';
  }
  if (!passwordInput.value.trim()) {
    passwordError.textContent = 'Senha é obrigatória';
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearStatusMessages();
  clearFieldErrors();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showRequiredMessages();
    showLoginView();
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));
    const message = data.message || '';

    if (response.ok) {
      loginMessage.textContent = '';
      showHomeView(message || 'Login efetuado com sucesso!');
    } else {
      loginMessage.textContent = message || 'Credenciais inválidas';
      showLoginView();
    }
  } catch (error) {
    loginMessage.textContent = 'Erro ao tentar fazer login';
    showLoginView();
  }
});

emailInput.addEventListener('input', () => {
  clearFieldErrors();
  updateButtonState();
});
passwordInput.addEventListener('input', () => {
  clearFieldErrors();
  updateButtonState();
});

window.addEventListener('DOMContentLoaded', () => {
  showLoginView();
  updateButtonState();
});
