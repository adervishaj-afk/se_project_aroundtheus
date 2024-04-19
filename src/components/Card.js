export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick, deleteCardPopup) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteModal = document.querySelector("#delete-card-modal");

    this._confirmDeleteButton =
      this._deleteModal.querySelector("#confirm-delete");

    this._cancelDeleteButton =
      this._deleteModal.querySelector("#cancel-delete");

    this._setModalEventListeners();
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
        this._openDeleteModal();
      });
    //Open modal for card image
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
  _setModalEventListeners() {
    this._confirmDeleteButton.addEventListener(
      "click",
      this._handleDeleteButton
    );
    this._cancelDeleteButton.addEventListener("click", this._closeDeleteModal);
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
    this._closeDeleteModal();
  }

  _openDeleteModal() {
    this._deleteModal.classList.add("modal_opened");
  }

  _closeDeleteModal() {
    this._deleteModal.classList.remove("modal_opened");
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
    this._setEventListeners();
    return this._cardElement;
  }
}
