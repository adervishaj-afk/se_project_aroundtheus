export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //likeButton element + eventListener
    this._cardElement
      .querySelector("#element-like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    //deleteButton element + eventListener
    this._cardElement
      .querySelector("#element-trash-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    this._cardElement
      .querySelector("#el-card-image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector("#element-like-button")
      .classList.toggle("element__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    //create card template
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    //add card image, alt text, and title
    this._cardElement.querySelector("#el-card-image").src = this._link;
    this._cardElement.querySelector("#el-card-image").alt = this._name;
    this._cardElement.querySelector("#el-card-title").textContent = this._name;

    //
    this._setEventListeners();
    return this._cardElement;
  }
}
