function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.classList.add(errorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, option) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, option);
  }
  hideInputError(formEl, inputEl, option);
}

function toggleButtonAccess(inputEl, submitButton, { inactiveButtonClass }) {
  let failedCheck = false;
  inputEl.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      failedCheck = true;
    }
  });

  if (failedCheck) {
    submitButton.classList.add(inactiveButtonClass);
    return (submitButton.disabled = true);
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListener(formEl, option) {
  const { inputSelector } = option;
  const submitButton = formEl.querySelector(".modal__button");
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, option);
      toggleButtonAccess(inputEls, submitButton, option);
    });
  });
}

function enableValidation(option) {
  const formEls = [...document.querySelectorAll(option.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListener(formEl, option);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
