export default class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteButton
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector("#element-like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector("#element-trash-button")
      .addEventListener("click", () => {
        this._handleDeleteButton(this._cardElement, { id: this._id });
      });

    this._cardElement
      .querySelector("#el-card-image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector("#element-like-button")
      .classList.toggle("element__like-button_active");
  }

  // _openDeleteModal() {}

  // handleDeleteButton() {
  //   this._cardElement.remove();
  //   // this._cardElement = null;
  // }

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
