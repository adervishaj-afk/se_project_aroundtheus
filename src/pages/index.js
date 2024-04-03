import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo.js";
//import Constants from "../utils/Constants.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*--------------------------------------------------------------------------------------- */
/*                                        ELEMENTS                                        */
/*--------------------------------------------------------------------------------------- */
// Edit Button
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseEditButton = document.querySelector(
  "#profile-close-edit-button"
);
const profileInfoTitle = document.querySelector("#profile-info-title");
const profileInfoDescription = document.querySelector(
  "#profile-info-description"
);

const profileModalNameInput = document.querySelector(
  "#profile-edit-modal-title"
);
const profileModalDescriptionInput = document.querySelector(
  "#profile-edit-modal-description"
);
const profileEditModalForm = profileEditModal.querySelector(
  "#modal-profile-edit-form"
);

// Add Button
const addButton = document.querySelector("#profile-add-button");
const addModal = document.querySelector("#profile-add-modal");
const closeAddButton = document.querySelector("#profile-close-add-button");
const addModalForm = addModal.querySelector("#modal-profile-add-form");

const addTitleInput = document.querySelector("#profile-modal-add-title");
const addUrlInput = document.querySelector("#profile-modal-add-URL");

//Card Elements
//const elementCardTemplate = document.querySelector("#elementCard").content.firstElementChild;
const cardList = document.querySelector("#el-card-list");
const imageModal = document.querySelector("#element-popout-modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-text");
const imageCloseButton = imageModal.querySelector(
  "#element-close-popout-button"
);
//------------------------------------------------ Refactoring Code

function createCard(item) {
  const card = new Card(item, "#elementCard", handleImageClick);
  return card.getView();
}

const handleImageClick = (cardData) => {
  const popupImage = new PopupWithImage("#element-popout-modal");

  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalTitle.textContent = cardData.name;

  popupImage.open(cardData);
  popupImage.setEventListeners();
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileEditFormValidator = new FormValidator(
  config,
  profileEditModalForm
);
profileEditFormValidator.enableValidation();

const addModalFormValidator = new FormValidator(config, addModalForm);
addModalFormValidator.enableValidation();
//------------------------------------------------------------------------------
const editFormPopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  profileInfoTitle.textContent = formData.title;
  profileInfoDescription.textContent = formData.description;
});

editFormPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  profileModalNameInput.value = profileInfoTitle.textContent.trim();
  profileModalDescriptionInput.value =
    profileInfoDescription.textContent.trim();
  editFormPopup.open();
});

const addFormPopup = new PopupWithForm("#profile-add-modal", (formData) => {
  const newCard = { name: addTitleInput.value, link: addUrlInput.value };
  renderCard(newCard);
});

addFormPopup.setEventListeners();
addButton.addEventListener("click", () => {
  profileModalNameInput.value = profileInfoTitle.textContent.trim();
  profileModalDescriptionInput.value =
    profileInfoDescription.textContent.trim();
  addFormPopup.open();
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  "#el-card-list"
);

function renderCard(items) {
  const cardElement = createCard(items);
  cardSection.addItem(cardElement);
}

cardSection.renderItems();
//-----------------------------------
