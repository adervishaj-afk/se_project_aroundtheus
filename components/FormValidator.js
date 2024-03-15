export default class FormValidator(settings, formValidator) {
  this._settings = settings;
  this._formValidator = formValidator;
}

_setEventListener(settings, formValidator) {
  this._formValidator.addEventListener("submit", (e) => {
    e.preventDefault();
});
}

