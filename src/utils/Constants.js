export default class Constants {
  static initialCards = [
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
  static profileEditButton = document.querySelector("#profile-edit-button");
  static profileEditModal = document.querySelector("#profile-edit-modal");
  static profileCloseEditButton = document.querySelector(
    "#profile-close-edit-button"
  );
  static profileInfoTitle = document.querySelector("#profile-info-title");
  static profileInfoDescription = document.querySelector(
    "#profile-info-description"
  );

  static profileModalNameInput = document.querySelector(
    "#profile-edit-modal-title"
  );
  static profileModalDescriptionInput = document.querySelector(
    "#profile-edit-modal-description"
  );
  static profileEditModalForm = profileEditModal.querySelector(
    "#modal-profile-edit-form"
  );

  // Add Button
  static addButton = document.querySelector("#profile-add-button");
  static addModal = document.querySelector("#profile-add-modal");
  static closeAddButton = document.querySelector("#profile-close-add-button");
  static addModalForm = addModal.querySelector("#modal-profile-add-form");

  static addTitleInput = document.querySelector("#profile-modal-add-title");
  static addUrlInput = document.querySelector("#profile-modal-add-URL");

  //Card Elements
  //static elementCardTemplate = document.querySelector("#elementCard").content.firstElementChild;
  static cardList = document.querySelector("#el-card-list");
  static imageModal = document.querySelector("#element-popout-modal");
  static modalImage = document.querySelector("#modal-image");
  static modalTitle = document.querySelector("#modal-text");
  static imageCloseButton = imageModal.querySelector(
    "#element-close-popout-button"
  );

  static config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };
}
