export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteButton,
    handleLike
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLike = handleLike;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector("#element-like-button")
      .addEventListener("click", () => {
        this._handleLike(this._cardElement, { id: this._id });
      });

    this._cardElement
      .querySelector(".element__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteButton(this);
      });

    this._cardElement
      .querySelector("#el-card-image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
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
    if (this._isLiked) {
      this._cardElement
        .querySelector(".element__like-button")
        .classList.add("element__like-button_active");
    } else {
      this._cardElement.querySelector(".element__like-button");
    }

    //
    this._setEventListeners();
    return this._cardElement;
  }
}
