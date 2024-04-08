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

const addFormPopup = new PopupWithForm("#profile-add-modal", () => {
  const newCard = {
    name: variables.addTitleInput.value,
    link: variables.addUrlInput.value,
  };
  renderCard(newCard);
});

addFormPopup.setEventListeners();
variables.addButton.addEventListener("click", () => {
  variables.addModalForm.reset();
  addModalFormValidator.resetValidation();
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
