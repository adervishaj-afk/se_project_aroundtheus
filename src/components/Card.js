export default class Card {
  constructor(
    { name, link, id },
    cardSelector,
    handleImageClick,
    handleLikeButtonClick,
    handleDeleteButtonClick
  ) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLike = handleLikeButtonClick;
    this._handleDelete = handleDeleteButtonClick;
  }

  _setEventListeners() {
    //likeButton element + eventListener
    this._cardElement
      .querySelector("#element-like-button")
      .addEventListener("click", () => {
        this._handleLikeButton(this);
      });
    //deleteButton element + eventListener
    this._cardElement
      .querySelector("#element-trash-button")
      .addEventListener("click", () => {
        ////////////////////////////////////////
        this._handleDelete(this);
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

  removeCard = () => {
    this._cardElement.remove();
    //this._closeDeleteModal();
  };
  ///////////////////////////
  /*
  _openDeleteModal() {
    this._cardSelector.content
      .querySelector("#element-trash-button")
      .classList.add("modal_opened");
  }
  ///////////////////////////
  _closeDeleteModal() {
    this._cardSelector.content
      .querySelector("#element-trash-button")
      .classList.remove("modal_opened");
  }
*/
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
