import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo.js";
import { variables, formConfig } from "../utils/Constants.js";
import Api from "../components/Api.js";

//------------------------------------------------ Refactoring Code
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    Authorization: "44ea7345-0378-4698-8841-25c6e07018e7",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    user.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    console.log("User information loaded and displayed successfully.");
  })
  .catch((error) => {
    console.error("Failed to load user information:", error);
  });

getCards();

function getCards() {
  api
    .getInitialCards()
    .then((cards) => {
      console.log("Cards fetched and rendered successfully.");
      renderCards(cards);
      return cards;
    })
    .catch((error) => {
      console.error("Failed to fetch cards:", error);
    });
}

function renderCards(cards) {
  cards.forEach((card) => {
    addCardToCardSection(card);
  });
}

function createCardApi(card) {
  api
    .createCard(card)
    .then((c) => {
      addCardToCardSection(c);
    })
    .then(console.log("Card created and rendered successfully."))
    .catch((error) => {
      console.error("Failed to create card:", error);
    });
}

function addCardToCardSection(card) {
  const c = new Card(
    card,
    "#elementCard",
    handleImageClick,
    handleDeleteCardButtonClick,
    handleLike
  );
  cardSection.addItem(c.getView());
}

const handleLike = (cardElement, cardData) => {
  cardElement
    .querySelector("#element-like-button")
    .classList.toggle("element__like-button_active");
  if (
    cardElement
      .querySelector("#element-like-button")
      .classList.contains("element__like-button_active")
  ) {
    api
      .unlikeCard(cardData.id)
      .then(() => console.log("Card disliked successfully."));
  } else {
    api
      .likeCard(cardData.id)
      .then(() => console.log("Card liked successfully."));
  }
};

const deleteCardModal = new Popup({
  popupSelector: "#delete-card-modal",
});

const handleDeleteCardButtonClick = (cardElement, cardData) => {
  deleteCardModal.setEventListeners();
  deleteCardModal.open();

  variables.confirmButton.addEventListener(
    "click",
    () => {
      api.deleteCard(cardData.id);
      cardElement.remove();
      deleteCardModal.close();
    },
    { once: true }
  );
};

const popupImage = new PopupWithImage("#element-popout-modal");
const handleImageClick = (cardData) => {
  popupImage.open(cardData);
};
popupImage.setEventListeners();

const profileEditFormValidator = new FormValidator(
  formConfig,
  //"#profile-edit-modal"
  variables.profileEditModalForm
);
profileEditFormValidator.enableValidation();

const addModalFormValidator = new FormValidator(
  formConfig,
  //"#profile-add-modal"
  variables.addModalForm
);
addModalFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  formConfig,
  variables.avatarModalForm
);
avatarFormValidator.enableValidation();

const editFormPopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  user.setUserInfo({
    name: formData.title,
    job: formData.description,
  });
});

editFormPopup.setEventListeners();

const user = new UserInfo({
  nameSelector: "#profile-info-title",
  jobSelector: "#profile-info-description",
  avatarSelector: "#user-avatar",
});

variables.profileEditButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  variables.profileModalNameInput.value = userInfo.name.trim();
  variables.profileModalDescriptionInput.value = userInfo.job.trim();
  editFormPopup.open();
});

const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  ({ title: name, link }) => {
    createCardApi({ name, link });
    variables.addModalForm.reset();
    addModalFormValidator.disableSubmitButton();
  }
);

addCardPopup.setEventListeners();
variables.addButton.addEventListener("click", () => {
  addCardPopup.open();
});

const avatarPopupForm = new PopupWithForm(
  "#edit-avatar",
  ({ link: avatar }) => {
    api.updateUserAvatar({ avatar });
    variables.avatarModalForm.reset();
    addModalFormValidator.disableSubmitButton();
  }
);

avatarPopupForm.setEventListeners();
variables.avatarIcon.addEventListener("click", () => {
  avatarPopupForm.open();
});

const cardSection = new Section("#el-card-list");
