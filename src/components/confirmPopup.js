import Popup from "./Popup.js";

export default class ConfirmPopup extends Popup {
  constructor({ popupSelector, confirmCallback }) {
    super({ popupSelector });
    this._id = null;
    this._confirmCallback = confirmCallback;
    this._confirmButton = this._popupElement.querySelector("#confirm-delete");
  }

  open(cardElement, id) {
    this._id = id;
    this._cardElement = cardElement;
    this._confirmButton.addEventListener("click", () => this._handlePress());
    super.open();
  }

  close() {
    this._confirmButton.removeEventListener("click", () => this.handlePress());

    super.close();
  }

  removeCard() {
    this._cardElement.remove();
  }

  _handlePress() {
    this._confirmCallback(this._id);
  }
}
