const profileEditModal = document.querySelector("#profile-edit-modal");
const addModal = document.querySelector("#profile-add-modal");
const imageModal = document.querySelector("#element-popout-modal");

export const variables = {
  profileEditButton: document.querySelector("#profile-edit-button"),
  profileCloseEditButton: document.querySelector("#profile-close-edit-button"),
  profileInfoTitle: document.querySelector("#profile-info-title"),
  profileInfoDescription: document.querySelector("#profile-info-description"),
  profileModalNameInput: document.querySelector("#profile-edit-modal-title"),
  profileModalDescriptionInput: document.querySelector(
    "#profile-edit-modal-description"
  ),
  profileEditModalForm: profileEditModal.querySelector(
    "#modal-profile-edit-form"
  ),
  addButton: document.querySelector("#profile-add-button"),
  closeAddButton: document.querySelector("#profile-close-add-button"),
  addModalForm: addModal.querySelector("#modal-profile-add-form"),
  addTitleInput: document.querySelector("#profile-modal-add-title"),
  addUrlInput: document.querySelector("#profile-modal-add-URL"),
  cardList: document.querySelector("#el-card-list"),
  modalImage: document.querySelector("#modal-image"),
  modalTitle: document.querySelector("#modal-text"),
  imageCloseButton: imageModal.querySelector("#element-close-popout-button"),
};

export const formConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const data = [
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

/*
export const editButtonConfig = {
  profileEditButton: "#profile-edit-button",
  profileEditModal: "#profile-edit-modal",
  profileCloseEditButton: "#profile-close-edit-button",
  profileInfoTitle: "#profile-info-title",
  profileInfoDescription: "#profile-info-description",
};

export const addButtonConfig = {
  addButton: "#profile-add-button",
  addModal: "#profile-add-modal",
  closeAddButton: "#profile-close-add-button",
  addModalForm: "#modal-profile-add-form",
  addTitleInput: "#profile-modal-add-title",
  addUrlInput: "#profile-modal-add-URL",
};

export const popupModalFormConfig = {
  editFormPopupSelector: "#profile-edit-modal",
  addFormPopupSelector: "#profile-add-modal",
  profileModalNameInput: "#profile-edit-modal-title",
  profileModalDescriptionInput: "#profile-edit-modal-description",
  profileEditModalForm: "#modal-profile-edit-form",
};

export const popupCardConfig = {
  cardList: "#el-card-list",
  imageModal: "#element-popout-modal",
  modalImage: "#modal-image",
  modalTitle: "#modal-text",
  imageCloseButton: imageModal.querySelector("#element-close-popout-button"),
  containerSelector: "#el-card-list",
};

*/
