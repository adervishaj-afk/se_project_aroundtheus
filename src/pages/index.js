import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo.js";
import { data, variables, formConfig } from "../utils/Constants.js";

//------------------------------------------------ Refactoring Code

function createCard(item) {
  const card = new Card(item, "#elementCard", handleImageClick);
  return card.getView();
}

const handleImageClick = (cardData) => {
  const popupImage = new PopupWithImage("#element-popout-modal");

  variables.modalImage.src = cardData.link;
  variables.modalImage.alt = cardData.name;
  variables.modalTitle.textContent = cardData.name;

  popupImage.open(cardData);
  popupImage.setEventListeners();
};

/*
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
*/

const profileEditFormValidator = new FormValidator(
  "#profile-edit-modal",
  variables.profileEditModalForm
);
profileEditFormValidator.enableValidation();

const addModalFormValidator = new FormValidator(
  "#profile-add-modal",
  variables.addModalForm
);
addModalFormValidator.enableValidation();
//------------------------------------------------------------------------------
const editFormPopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  variables.profileInfoTitle.textContent = formData.title;
  variables.profileInfoDescription.textContent = formData.description;
});

editFormPopup.setEventListeners();

variables.profileEditButton.addEventListener("click", () => {
  variables.profileModalNameInput.value =
    variables.profileInfoTitle.textContent.trim();

  variables.profileModalDescriptionInput.value =
    variables.profileInfoDescription.textContent.trim();
  editFormPopup.open();
});

const addFormPopup = new PopupWithForm("#profile-add-modal", (formData) => {
  const newCard = {
    name: formData.addTitleInput.value,
    link: formData.addUrlInput.value,
  };
  renderCard(newCard);
});

addFormPopup.setEventListeners();
variables.addButton.addEventListener("click", () => {
  variables.profileModalNameInput.value =
    variables.profileInfoTitle.textContent.trim();
  variables.profileModalDescriptionInput.value =
    variables.profileInfoDescription.textContent.trim();
  addFormPopup.open();
});

const cardSection = new Section(
  {
    items: data,
    renderer: renderCard,
  },
  "#el-card-list"
);

function renderCard(items) {
  const cardElement = createCard(items);
  cardSection.addItem(cardElement);
}

cardSection.renderItems();
