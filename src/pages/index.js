import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
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

// api
// .getInitialCards()
// .then((cards) => {
//   cards.forEach((card) => {
//     renderCard(card);
//   });
//   console.log("Cards fetched and rendered successfully.");
// })
// .catch((error) => {
//   console.error("Failed to fetch cards:", error);
// });
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
    const c = new Card(card, "#elementCard", handleImageClick);
    cardSection.addItem(c.getView());
  });
}

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
//------------------------------------------------------------------------------
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
});

variables.profileEditButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  variables.profileModalNameInput.value = userInfo.name.trim();
  variables.profileModalDescriptionInput.value = userInfo.job.trim();
  editFormPopup.open();
});

const addFormPopup = new PopupWithForm(
  "#profile-add-modal",
  ({ title: name, link }) => {
    renderCard({ name, link });
    variables.addModalForm.reset();
    addModalFormValidator.disableSubmitButton();
  }
);

addFormPopup.setEventListeners();
variables.addButton.addEventListener("click", () => {
  addFormPopup.open();
});
//

const cardSection = new Section("#el-card-list");

// function renderCard(item) {
//   const cardElement = createCard(item);
//   cardSection.addItem(cardElement);
// }
