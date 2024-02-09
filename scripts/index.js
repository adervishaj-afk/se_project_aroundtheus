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
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseEditButton = document.querySelector(
  "#profile-close-edit-button"
);
const profileInfoTitle = document.querySelector("#profile-info-title");
const profileInfoDescription = document.querySelector(
  "#profile-info-description"
);
const profileModalNameInput = document.querySelector("#profile-modal-title");
const profileModalDescriptionInput = document.querySelector(
  "#profile-modal-description"
);
const profileEditModalForm = profileEditModal.querySelector(
  "#modal-profile-edit-form"
);
const elementCardTemplate =
  document.querySelector("#elementCard").content.firstElementChild;
const elCardList = document.querySelector("#el-card-list");
const profileAddButton = document.querySelector("#profile-add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileCloseAddButton = document.querySelector(
  "#profile-close-add-button"
);
const profileAddModalForm = profileAddModal.querySelector(
  "#modal-profile-add-form"
);

/*--------------------------------------------------------------------------------------- */
/*                                        FUNCTIONS                                       */
/*--------------------------------------------------------------------------------------- */

function toggleEditPopup() {
  profileEditModal.classList.toggle("modal_opened");
}

function toggleAddPopup() {
  profileAddModal.classList.toggle("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = elementCardTemplate.cloneNode(true);
  const elCardImage = cardElement.querySelector("#el-card-image");
  const elCardTitle = cardElement.querySelector("#el-card-title");
  elCardImage.setAttribute("src", cardData.link);
  elCardImage.setAttribute("alt", cardData.name);
  elCardTitle.textContent = cardData.name;
  return cardElement;
}

/*--------------------------------------------------------------------------------------- */
/*                                        EVENT HANDLERS                                  */
/*--------------------------------------------------------------------------------------- */

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileInfoTitle.textContent = profileModalNameInput.value;
  profileInfoDescription.textContent = profileModalDescriptionInput.value;
  toggleEditPopup();
}

function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();
  profileInfoTitle.textContent = profileModalNameInput.value;
  profileInfoDescription.textContent = profileModalDescriptionInput.value;
  toggleAddPopup();
}

/*--------------------------------------------------------------------------------------- */
/*                                        EVENT LISTENERS                                 */
/*--------------------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileModalNameInput.value = profileInfoTitle.textContent.trim();
  profileModalDescriptionInput.value =
    profileInfoDescription.textContent.trim();
  toggleEditPopup();
});

profileAddButton.addEventListener("click", () => {
  profileModalNameInput.value = profileInfoTitle.textContent.trim();
  profileModalDescriptionInput.value =
    profileInfoDescription.textContent.trim();
  toggleAddPopup();
});

profileCloseEditButton.addEventListener("click", () => {
  toggleEditPopup();
});

profileCloseAddButton.addEventListener("click", () => {
  toggleAddPopup();
});

profileEditModalForm.addEventListener("submit", handleProfileEditFormSubmit);
profileAddModalForm.addEventListener("submit", handleProfileEditFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  elCardList.prepend(cardElement);
});
