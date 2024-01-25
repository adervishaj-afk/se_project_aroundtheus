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
const profileModalForm = profileEditModal.querySelector("#modal-form");
const elementCardTemplate =
  document.querySelector("#elementCard").content.firstElementChild;
const elCardList = document.querySelector("#el-card-list");

//There's space in the name/description
//placeholder when the modal opens - needs correcting
function closePopop() {
  profileEditModal.classList.toggle("modal__opened");
}

profileEditButton.addEventListener("click", () => {
  profileModalNameInput.value = profileInfoTitle.textContent;
  profileModalDescriptionInput.value = profileInfoDescription.textContent;
  closePopop();
});

profileCloseEditButton.addEventListener("click", () => {
  profileEditModal.classList.toggle("modal__opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileInfoTitle.textContent = profileModalNameInput.value;
  profileInfoDescription.textContent = profileModalDescriptionInput.value;
  closePopop();
}
profileModalForm.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(cardData) {
  const cardElement = elementCardTemplate.cloneNode(true);
  const elCardImage = elementCardTemplate.querySelector("#el-card-image");
  const elCardTitle = elementCardTemplate.querySelector("#el-card-title");
  elCardImage.setAttribute("src", cardData.link);
  elCardImage.setAttribute("alt", cardData.name);
  elCardTitle.textContent = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  elCardList.prepend(cardElement);
});
