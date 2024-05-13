export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteButton,
    likeCardAPI,
    unlikeCardAPI
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._likeCardAPI = likeCardAPI;
    this._unlikeCardAPI = unlikeCardAPI;

    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    this._cardImage = this._cardElement.querySelector("#el-card-image");
    this._cardDescription = this._cardElement.querySelector("#el-card-title");
    this._likeButton = this._cardElement.querySelector(".element__like-button");
    this._trashButton = this._cardElement.querySelector(
      ".element__trash-button"
    );
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike({ id: this._id });
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteButton(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLike(cardData) {
    if (this._likeButton.classList.contains("element__like-button_active")) {
      this._unlikeCardAPI(cardData.id, this._likeButton);
    } else {
      this._likeCardAPI(cardData.id, this._likeButton);
    }
  }

  getView() {
    //create card template
    //add card image, alt text, and title
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardDescription.textContent = this._name;
    //
    if (this._isLiked) {
      this._likeButton.classList.add("element__like-button_active");
    }

    //
    this._setEventListeners();
    return this._cardElement;
  }
}
