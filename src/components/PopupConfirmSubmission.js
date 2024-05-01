import Popup from "./Popup.js";

export default class PopupConfirmSubmission extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", () => {
      this._handleFormSubmit();
      super.close();
    });
    super.setEventListeners();
  }
}
