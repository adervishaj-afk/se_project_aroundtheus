import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const elementCardTemplate =
  document.querySelector("#elementCard").content.firstElementChild;
const cardList = document.querySelector("#el-card-list");
const imageModal = document.querySelector("#element-popout-modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-text");
const imageCloseButton = imageModal.querySelector(
  "#element-close-popout-button"
);

/*--------------------------------------------------------------------------------------- */
/*                                        FUNCTIONS                                       */
/*--------------------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_opened");
  //Escape Key Event Listeners
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  //Escape Key Event Listeners
  modal.removeEventListener("keydown", closeByEscape);
}

function closeModalClickOut(e) {
  if (e.target.classList.contains("modal_opened")) closeModal(e.target);
}

function closeByEscape(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

/*
function getCardElement(cardData) {
  const cardElement = elementCardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector("#el-card-image");
  const cardTitle = cardElement.querySelector("#el-card-title");
  cardImage.setAttribute("src", cardData.link);
  cardImage.setAttribute("alt", cardData.name);
  cardTitle.textContent = cardData.name;

  const likeButton = cardElement.querySelector("#element-like-button");
  const trashButton = cardElement.querySelector("#element-trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like-button_active");
  });

  trashButton.addEventListener("click", (evt) => {
    deleteCard(evt.target);
  });

  //card image popout
  cardImage.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalTitle.textContent = cardData.name;
    openModal(imageModal);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.closest(".element").remove();
}

function renderCard(cardData, cardList) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}
*/

/*--------------------------------------------------------------------------------------- */
/*                                        EVENT HANDLERS                                  */
/*--------------------------------------------------------------------------------------- */

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileInfoTitle.textContent = profileModalNameInput.value;
  profileInfoDescription.textContent = profileModalDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();

  const newCard = { name: addTitleInput.value, link: addUrlInput.value };
  const card = new Card(newCard, "#elementCard", handleImageClick);
  cardList.append(card.getView());
  closeModal(addModal);
  evt.target.reset();
}

/*--------------------------------------------------------------------------------------- */
/*                                        EVENT LISTENERS                                 */
/*--------------------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileModalNameInput.value = profileInfoTitle.textContent.trim();
  profileModalDescriptionInput.value =
    profileInfoDescription.textContent.trim();
  openModal(profileEditModal);
});
addButton.addEventListener("click", () => {
  openModal(addModal);
});

profileCloseEditButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});
closeAddButton.addEventListener("click", () => {
  closeModal(addModal);
});
imageCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

profileEditModalForm.addEventListener("submit", handleProfileEditFormSubmit);
addModalForm.addEventListener("submit", handleProfileAddFormSubmit);

profileEditModal.addEventListener("mousedown", closeModalClickOut);
addModal.addEventListener("mousedown", closeModalClickOut);
imageModal.addEventListener("mousedown", closeModalClickOut);

//Generate cards

const handleImageClick = (cardData) => {
  modalImage.src = cardData._link;
  modalImage.alt = cardData._name;
  modalTitle.textContent = cardData._name;
  openModal(imageModal);
};

initialCards.forEach((cardData) => {
  const cardElement = new Card(cardData, "#elementCard", handleImageClick);
  cardList.append(cardElement.getView());
});

//class restructuring
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