const profileEditModal = document.querySelector("#profile-edit-modal");
const addModal = document.querySelector("#profile-add-modal");
const imageModal = document.querySelector("#element-popout-modal");
const deleteModal = document.querySelector("#delete-card-modal");

export const variables = {
  profileEditModal: document.querySelector("#profile-edit-modal"),
  addModal: document.querySelector("#profile-add-modal"),
  imageModal: document.querySelector("#element-popout-modal"),
  deleteModal: document.querySelector("#delete-card-modal"),
  profAvatar: document.querySelector("#avatar"),
  confirmDeleteButton: deleteModal.querySelector("#confirm-delete"),
  cancelDeleteButton: deleteModal.querySelector("#cancel-delete"),
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
