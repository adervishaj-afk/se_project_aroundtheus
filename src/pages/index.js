import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import confirmPopup from "../components/ConfirmPopup.js";
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

const user = new UserInfo({
  nameSelector: "#profile-info-title",
  jobSelector: "#profile-info-description",
  avatarSelector: "#user-avatar",
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

const editFormPopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  variables.editModalProfileSaveButton.textContent = "Saving...";
  api
    .updateUserProfile({ name: formData.title, about: formData.description })
    .then(() => {
      user.setUserInfo({
        name: formData.title,
        job: formData.description,
      });
      editFormPopup.close();
    })
    .catch((error) => {
      console.error("Failed to update user information:", error);
    })
    .finally(() => {
      variables.editModalProfileSaveButton.textContent = "Save";
    });
});

variables.profileEditButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  variables.profileModalNameInput.value = userInfo.name.trim();
  variables.profileModalDescriptionInput.value = userInfo.job.trim();
  editFormPopup.open();
});

editFormPopup.setEventListeners();

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
      addCardPopup.close();
      variables.addModalForm.reset();
    })
    .then(console.log("Card created and rendered successfully."))
    .catch((error) => {
      console.error("Failed to create card:", error);
    });
}

/*
cardSection = new Section(
        {
            items: cards,
            renderer: (card) => {
                // Create a new card
                const cardElement = createCard(card, userId);
                // Display each card
                cardSection.addItem(cardElement);
            },
        },
        selectors.cardsList,
        userId
    );
    // Render the entire list of cards on the page
    cardSection.renderItems(cards);
})
.catch((err) => {
    // If the server returns an error, reject the promise
    console.error(`Error: ${err}`);
})
*/

const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  ({ title: name, link }) => {
    createCardApi({ name, link });
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
    variables.avatarModalSaveButton.textContent = "Saving...";
    api
      .updateUserAvatar({ avatar })
      .then((res) => {
        avatarPopupForm.close();
        variables.avatarModalForm.reset();
        console.log("Profile data saved successfully:", res);
      })
      .catch((error) => {
        console.error("Failed to update user avatar:", error);
      })
      .finally(() => {
        variables.avatarModalSaveButton.textContent = "Save";
      });
    addModalFormValidator.disableSubmitButton();
  }
);

avatarPopupForm.setEventListeners();
variables.avatarIcon.addEventListener("click", () => {
  avatarPopupForm.open();
});

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
      .likeCard(cardData.id)
      .then(() => console.log("Card liked successfully."))
      .catch((error) => {
        console.error("Failed to like card:", error);
      });
  } else {
    api
      .unlikeCard(cardData.id)
      .then(() => console.log("Card disliked successfully."))
      .catch((error) => {
        console.error("Failed to unlike card:", error);
      });
  }
};

const deleteCardModal = new confirmPopup({
  popupSelector: "#delete-card-modal",
  confirmCallback: (id) => {
    api
      .deleteCard(id)
      .then(() => {
        deleteCardModal.removeCard();
        deleteCardModal.close();
        (data) => console.log(data);
      })
      .catch((error) => {
        console.error("Failed to delete card:", error);
      });
  },
});

deleteCardModal.setEventListeners();

const handleDeleteCardButtonClick = (cardElement, cardData) => {
  deleteCardModal.open(cardElement, cardData.id);
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

const cardSection = new Section("#el-card-list");
