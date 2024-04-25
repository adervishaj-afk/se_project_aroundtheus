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
      about: userData.about,
      avatar: userData.avatar,
    });
    console.log("User information loaded and displayed successfully.");
  })
  .catch((error) => {
    console.error("Failed to load user information:", error);
  });

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((card) => {
      renderCard(card);
    });
    console.log("Cards fetched and rendered successfully.");
  })
  .catch((error) => {
    console.error("Failed to fetch cards:", error);
  });

function createCard(item) {
  const card = new Card(
    item,
    "#elementCard",
    handleImageClick,
    handleLikeButtonClick,
    handleDeleteButtonClick
  );
  const cardEl = card.getView();
  attachCardListeners(cardEl, item);
  return cardEl;
}

function handleDeleteButtonClick(item) {
  //delete card functionlaity should be used when modal is opened
  api
    .deleteCard(item._id)
    .then(() => {
      console.log(`Card ${item._id} successfully deleted`);
      item.removeCard();
      //closeDeleteModal(deleteModal);
    })
    .catch((error) => {
      console.error(`Failed to delete card ${item._id}:`, error);
      //closeDeleteModal(deleteModal);
    });
}

function attachCardListeners(cardEl, item) {
  const likeButton = cardEl.querySelector("#element-like-button");
  likeButton.addEventListener("click", () =>
    handleLikeButtonClick(likeButton, item)
  );

  const deleteButton = cardEl.querySelector("#element-trash-button");
  deleteButton.addEventListener("click", () => openDeleteModal(item));
}
////////////////////////////////////////////////////////////////////////////////////
function handleLikeButtonClick(likeButton, item) {
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "element__like-button_active"
    );

    const ifLiked = isLiked ? api.unlikeCard : api.likeCard;

    ifLiked(item._id)
      .then(() => {
        likeButton.classList.toggle("modal_opened");
        console.log(
          `Card ${item._id} ${isLiked ? "unliked" : "liked"} successfully`
        );
      })
      .catch((error) => {
        console.error(
          `Error processing like/unlike for card ${item._id}:`,
          error
        );
      });
  });
}
const deleteModal = new PopupWithForm("#delete-card-modal");
const openDeleteModal = (cardData) => {
  deleteModal.open(cardData);
};

const closeDeleteModal = (deleteModal) => {
  deleteModal.close();
};

deleteModal.setEventListeners();

variables.confirmDeleteButton.addEventListener("click", () =>
  handleDeleteButtonClick(item, variables.deleteModal)
);

variables.cancelDeleteButton.addEventListener("click", () =>
  closeDeleteModal(variables.deleteModal)
);

variables.addModal.addEventListener("submit", () => {
  const name = variables.addTitleInput.value;
  const link = variables.addUrlInput.value;

  api
    .createCard({ name, link })
    .then((card) => {
      renderCard(card);
      console.log("Card successfully created", card);
      document.querySelector("#profile-add-modal").reset();
    })
    .catch((error) => {
      console.error("Card unable to be created", error);
    });
});

//popup image class instantiation followed by method call to open image popup when clicked
const popupImage = new PopupWithImage("#element-popout-modal");
const handleImageClick = (cardData) => {
  popupImage.open(cardData);
};
popupImage.setEventListeners();

//instantiation of formValidator class for profile modal
const profileEditFormValidator = new FormValidator(
  formConfig,
  variables.profileEditModalForm
);
profileEditFormValidator.enableValidation();

//instantiation of formValidator class for addModal
const addModalFormValidator = new FormValidator(
  formConfig,
  variables.addModalForm
);
addModalFormValidator.enableValidation();

//instantiation of popupWithForm class for the edit modal
const editFormPopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  user.setUserInfo({
    name: formData.title,
    job: formData.description,
  });
});

//setting the event listeners for the edit profile modal
editFormPopup.setEventListeners();

//instantiation of the UserInfo class
const user = new UserInfo({
  nameSelector: "#profile-info-title",
  jobSelector: "#profile-info-description",
});

//API call to listen for the avatar click and update the avatar image through name/link value
variables.profAvatar.addEventListener("submit", function (event) {
  event.preventDefault();
  const avatar = variables.profAvatar.value;
  api
    .updateUserAvatar({ avatar })
    .then(() => {
      console.log("Avatar updated successfully.");
      user.setUserInfo({ avatar });
      document.document.querySelector(".profile__image").value = "";
      alert("Avatar updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
      alert("Failed to update avatar!");
    });
});

//API method call to update the edit profile
variables.profileEditModal.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = variables.profileModalNameInput.value;
  const about = variables.profileModalDescriptionInput.value;

  api
    .updateUserProfile({ name, about })
    .then(() => {
      console.log("Profile updated successfully.");
      user.setUserInfo({ name, about });
      alert("Profile updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    });
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

const cardSection = new Section(
  {
    renderer: renderCard,
  },
  "#el-card-list"
);

function renderCard(item) {
  const cardElement = createCard(item);
  cardSection.addItem(cardElement);
}
