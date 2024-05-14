import Popup from "./Popup.js";

export default class ConfirmPopup extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  setSubmitAction(callback) {
    this._handleFormSubmit = callback;
  }

  setEventListeners() {
    this._submitButton.addEventListener("click", () => {
      this._handleFormSubmit();
    });

    super.setEventListeners();
  }
}
