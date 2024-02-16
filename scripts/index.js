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
const profileAddButton = document.querySelector("#profile-add-button");
const addModal = document.querySelector("#profile-add-modal");
const closeAddButton = document.querySelector("#profile-close-add-button");
const profileAddModalForm = addModal.querySelector("#modal-profile-add-form");

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
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

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

  const name = addTitleInput.value;
  const link = addUrlInput.value;
  renderCard({ name, link }, cardList);
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

profileAddButton.addEventListener("click", () => {
  profileModalNameInput.value = profileInfoTitle.textContent.trim();
  profileModalDescriptionInput.value =
    profileInfoDescription.textContent.trim();
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
profileAddModalForm.addEventListener("submit", handleProfileAddFormSubmit);

//Generate cards
initialCards.forEach((cardData) => {
  renderCard(cardData, cardList);
});
