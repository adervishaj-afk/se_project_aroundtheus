import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._modalImage = this._popupElement.querySelector("#modal-image");
    this._modalTitle = this._popupElement.querySelector("#modal-text");
  }

  open({ name, link }) {
    this._modalImage.src = link;
    this._modalImage.alt = `Image of ${name}`;
    this._modalTitle.textContent = name;

    super.open();
  }
}
