// ==========================================
// 1. КОНСТАНТИ ТА РЕГУЛЯРНІ ВИРАЗИ (RegEx)
// ==========================================
const REGEX_PHONE = /^\+380\d{9}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ==========================================
// 2. ОТРИМАННЯ DOM-ЕЛЕМЕНТІВ ФОРМИ ТА ПОЛІВ
// ==========================================
const form = document.getElementById('feedbackForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const agreementCheckbox = document.getElementById('agreement');

// Елементи модального вікна
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Елементи для відображення повідомлень про помилки
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');
const agreementError = document.getElementById('agreementError');

// Перевірка наявності форми в DOM
if (!form) {
  console.error('ПОМИЛКА: Елемент з id="feedbackForm" не знайдено в HTML!');
} else {
  console.log('Скрипт валідації успішно завантажено та підключено до форми.');
}

// Прапорці для відстеження взаємодії
const touched = {
  username: false,
  email: false,
  phone: false,
  message: false,
  agreement: false
};

// ==========================================
// 3. ДОПОМІЖНІ ФУНКЦІЇ КЕРУВАННЯ UI-СТАНАМИ (З ACCESSIBILITY / A11Y)
// ==========================================

function showError(inputElement, errorElement, errorMessage) {
  if (inputElement) {
    if (inputElement.type !== 'checkbox') {
      inputElement.classList.remove('border-[#32331E]', 'border-green-700');
      inputElement.classList.add('border-red-700');
    }
    inputElement.setAttribute('aria-invalid', 'true');
  }
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.remove('hidden');
  }
}

function showSuccess(inputElement, errorElement) {
  if (inputElement) {
    if (inputElement.type !== 'checkbox') {
      inputElement.classList.remove('border-[#32331E]', 'border-red-700');
      inputElement.classList.add('border-green-700');
    }
    inputElement.setAttribute('aria-invalid', 'false');
  }
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }
}

function clearError(inputElement, errorElement) {
  if (inputElement) {
    if (inputElement.type !== 'checkbox') {
      inputElement.classList.remove('border-red-700', 'border-green-700');
      inputElement.classList.add('border-[#32331E]');
    }
    inputElement.setAttribute('aria-invalid', 'false');
  }
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }
}

function resetFormState() {
  if (form) form.reset();
  Object.keys(touched).forEach(key => touched[key] = false);

  clearError(usernameInput, nameError);
  clearError(emailInput, emailError);
  clearError(phoneInput, phoneError);
  clearError(messageInput, messageError);
  clearError(agreementCheckbox, agreementError);
}

// ==========================================
// 4. ФУНКЦІЇ ВАЛІДАЦІЇ ОКРЕМИХ ПОЛІВ
// ==========================================

function validateName() {
  if (!usernameInput) return false;
  const value = usernameInput.value.trim();
  if (value === '') {
    showError(usernameInput, nameError, 'Введіть ваше ім\'я');
    return false;
  }
  if (value.length < 2) {
    showError(usernameInput, nameError, 'Ім\'я має містити щонайменше 2 символи');
    return false;
  }
  showSuccess(usernameInput, nameError);
  return true;
}

function validateEmail() {
  if (!emailInput) return false;
  const value = emailInput.value.trim();
  if (value === '') {
    showError(emailInput, emailError, 'Введіть електронну пошту');
    return false;
  }
  if (!REGEX_EMAIL.test(value)) {
    showError(emailInput, emailError, 'Введіть коректний email (наприклад: name@domain.com)');
    return false;
  }
  showSuccess(emailInput, emailError);
  return true;
}

/**
 * Смарт-валідація поля "Телефон": нормалізація формату + точні тексти помилок
 */
function validatePhone() {
  if (!phoneInput) return false;

  let value = phoneInput.value.trim();

  // 1. Прибираємо пробіли, дужки, дефіси та крапки
  value = value.replace(/[\s\-().]/g, '');

  // 2. Приводимо до формату +380XXXXXXXXX
  if (/^0\d{9}$/.test(value)) {
    value = '+38' + value;            // 0501234567   -> +380501234567
  } else if (/^380\d{9}$/.test(value)) {
    value = '+' + value;              // 380501234567 -> +380501234567
  } else if (/^80\d{9}$/.test(value)) {
    value = '+3' + value;             // 80501234567  -> +380501234567
  }

  if (value !== phoneInput.value) {
    phoneInput.value = value;
  }

  // 3. Деталізовані перевірки
  if (value === '') {
    showError(phoneInput, phoneError, 'Введіть номер телефону');
    return false;
  }

  if (/[^\d+]/.test(value)) {
    showError(phoneInput, phoneError, 'Номер повинен містити лише цифри та знак +');
    return false;
  }

  if (!value.startsWith('+380')) {
    showError(phoneInput, phoneError, 'Формат має починатися з +380');
    return false;
  }

  if (value.length < 13) {
    showError(phoneInput, phoneError, 'Номер закороткий. Введіть 9 цифр після +380');
    return false;
  }

  if (value.length > 13) {
    showError(phoneInput, phoneError, 'Номер задовгий. Потрібно рівно 9 цифр після +380');
    return false;
  }

  if (!REGEX_PHONE.test(value)) {
    showError(phoneInput, phoneError, 'Некоректний формат телефону (+380XXXXXXXXX)');
    return false;
  }

  showSuccess(phoneInput, phoneError);
  return true;
}

function validateMessage() {
  if (!messageInput) return false;
  const value = messageInput.value.trim();
  if (value === '') {
    showError(messageInput, messageError, 'Введіть текст повідомлення');
    return false;
  }
  if (value.length < 10) {
    showError(messageInput, messageError, 'Повідомлення має містити щонайменше 10 символів');
    return false;
  }
  showSuccess(messageInput, messageError);
  return true;
}

function validateAgreement() {
  if (!agreementCheckbox) return false;
  if (!agreementCheckbox.checked) {
    showError(agreementCheckbox, agreementError, 'Необхідно погодитися з політикою конфіденційності');
    return false;
  }
  showSuccess(agreementCheckbox, agreementError);
  return true;
}

// ==========================================
// 5. ДИНАМІЧНІ ОБРОБНИКИ ПОДІЙ (BLUR, INPUT, CHANGE)
// ==========================================

if (usernameInput) {
  usernameInput.addEventListener('blur', () => { touched.username = true; validateName(); });
  usernameInput.addEventListener('input', () => { if (touched.username) validateName(); });
}

if (emailInput) {
  emailInput.addEventListener('blur', () => { touched.email = true; validateEmail(); });
  emailInput.addEventListener('input', () => { if (touched.email) validateEmail(); });
}

if (phoneInput) {
  phoneInput.addEventListener('blur', () => { touched.phone = true; validatePhone(); });
  phoneInput.addEventListener('input', () => { if (touched.phone) validatePhone(); });
}

if (messageInput) {
  messageInput.addEventListener('blur', () => { touched.message = true; validateMessage(); });
  messageInput.addEventListener('input', () => { if (touched.message) validateMessage(); });
}

if (agreementCheckbox) {
  agreementCheckbox.addEventListener('change', () => { touched.agreement = true; validateAgreement(); });
}

// ==========================================
// 6. ПЕРЕХІД МІЖ ПОЛЯМИ ПО НАТИСКАННЮ ENTER (UX IMPROVEMENT)
// ==========================================
if (form) {
  const inputs = Array.from(form.querySelectorAll('input:not([type="checkbox"]), textarea'));

  inputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && input.tagName !== 'TEXTAREA') {
        event.preventDefault();
        
        const nextInput = inputs[index + 1];
        if (nextInput) {
          nextInput.focus();
        } else {
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) submitBtn.focus();
        }
      }
    });
  });
}

// ==========================================
// 7. КЕРУВАННЯ МОДАЛЬНИМ ВІКНОМ ТА ACCESSIBILITY (A11Y)
// ==========================================

function openModal() {
  if (!successModal) return;
  successModal.classList.remove('hidden');
  successModal.classList.add('flex');
  
  if (closeModalBtn) {
    setTimeout(() => closeModalBtn.focus(), 50);
  }
}

function closeModal() {
  if (!successModal) return;
  successModal.classList.add('hidden');
  successModal.classList.remove('flex');
  
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  if (submitBtn) {
    submitBtn.focus();
  }
}

// ==========================================
// 8. ОБРОБКА ПОДІЇ ВІДПРАВКИ ФОРМИ (SUBMIT)
// ==========================================
if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const submitError = document.getElementById('feedbackSubmitError');
  let sending = false;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (sending) return;
    if (submitError) submitError.hidden = true;

    Object.keys(touched).forEach(key => touched[key] = true);

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();
    const isAgreementValid = validateAgreement();

    if (!(isNameValid && isEmailValid && isPhoneValid && isMessageValid && isAgreementValid)) return;

    const { hostname, protocol } = window.location;
    if (protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(hostname)) {
      if (submitError) {
        submitError.textContent = 'Надсилання доступне на опублікованому сайті.';
        submitError.hidden = false;
      }
      return;
    }

    sending = true;
    if (submitButton) submitButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!response.ok) throw new Error('Feedback submission failed');
      resetFormState();
      openModal();
    } catch {
      if (submitError) {
        submitError.textContent = 'Не вдалося надіслати повідомлення. Спробуйте ще раз.';
        submitError.hidden = false;
      }
    } finally {
      sending = false;
      if (submitButton) submitButton.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
}

if (closeModalBtn && successModal) {
  closeModalBtn.addEventListener('click', closeModal);

  successModal.addEventListener('click', (event) => {
    if (event.target === successModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !successModal.classList.contains('hidden')) {
      closeModal();
    }
  });
}