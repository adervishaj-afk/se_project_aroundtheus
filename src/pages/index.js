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

/* -------------------------------------------------------------------------- */
/*                     Get initial user info from server--                    */
/* -------------------------------------------------------------------------- */

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
  })
  .catch((error) => {
    console.error("Failed to load user information:", error);
  });

/* -------------------------------------------------------------------------- */
/*                       Display the user info                                */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                   Edit Button Event Listener                               */
/* -------------------------------------------------------------------------- */

variables.profileEditButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  variables.profileModalNameInput.value = userInfo.name.trim();
  variables.profileModalDescriptionInput.value = userInfo.job.trim();
  editFormPopup.open();
});

editFormPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                    Get the initial cards from server                       */
/* -------------------------------------------------------------------------- */

getCards();

let cardSection;

function getCards() {
  api
    .getInitialCards()
    .then((cards) => {
      cardSection = new Section(
        {
          items: cards,
          renderer: (card) => {
            const cardElement = createCard(card);
            cardSection.addItem(cardElement);
          },
        },
        "#el-card-list"
      );
      cardSection.renderCards(cards);
    })
    .catch((error) => {
      console.error("Failed to fetch cards:", error);
    });
}

/* -------------------------------------------------------------------------------------------- */
/*      Create new card and store the info in the server, then call to render card object       */
/* -------------------------------------------------------------------------------------------- */

function createNewCard(card) {
  api
    .createCard(card)
    .then((cardData) => {
      cardSection.addItem(createCard(cardData));
      addCardPopup.close();
      variables.addModalForm.reset();
    })
    .catch((error) => {
      console.error("Failed to create card:", error);
    });
}

/* -------------------------------------------------------------------------- */
/*               Call API to submit card info to be created                   */
/* -------------------------------------------------------------------------- */

const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  ({ title: name, link }) => {
    createNewCard({ name, link });
    addModalFormValidator.disableSubmitButton();
  }
);

/* -------------------------------------------------------------------------- */
/*                    Add Card Form Event Listener                            */
/* -------------------------------------------------------------------------- */

addCardPopup.setEventListeners();
variables.addButton.addEventListener("click", () => {
  addCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                         Call API and pass info to update the avatar        */
/* -------------------------------------------------------------------------- */

const avatarPopupForm = new PopupWithForm(
  "#edit-avatar",
  ({ link: avatar }) => {
    variables.avatarModalSaveButton.textContent = "Saving...";
    api
      .updateUserAvatar({ avatar })
      .then((res) => {
        avatarPopupForm.close();
        variables.avatarModalForm.reset();
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

/* -------------------------------------------------------------------------- */
/*                   Edit Avatar Form Event Listener                          */
/* -------------------------------------------------------------------------- */

avatarPopupForm.setEventListeners();
variables.avatarIcon.addEventListener("click", () => {
  avatarPopupForm.open();
});

/* -------------------------------------------------------------------------- */
/*                  Create card object and render the images                  */
/* -------------------------------------------------------------------------- */

function createCard(card) {
  const newCard = new Card(
    card,
    "#elementCard",
    handleImageClick,
    handleDeleteCardButtonClick,
    handleLike
  );

  return newCard.getView();
}

/* -------------------------------------------------------------------------- */
/*              Handle like/dislike functionality callback                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                     Delete card functionality callback                     */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                         Delete Modal Event Listener                        */
/* -------------------------------------------------------------------------- */

deleteCardModal.setEventListeners();

const handleDeleteCardButtonClick = (cardElement, cardData) => {
  deleteCardModal.open(cardElement, cardData.id);
};

/* -------------------------------------------------------------------------- */
/*                         Expand Image Event Listener                        */
/* -------------------------------------------------------------------------- */

const popupImage = new PopupWithImage("#element-popout-modal");
const handleImageClick = (cardData) => {
  popupImage.open(cardData);
};
popupImage.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                  Pass form inputs to validate *Edit* form data             */
/* -------------------------------------------------------------------------- */

const profileEditFormValidator = new FormValidator(
  formConfig,
  //"#profile-edit-modal"
  variables.profileEditModalForm
);
profileEditFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                  Pass form inputs to validate *Add* form data              */
/* -------------------------------------------------------------------------- */

const addModalFormValidator = new FormValidator(
  formConfig,
  //"#profile-add-modal"
  variables.addModalForm
);
addModalFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                  Pass form inputs to validate *Avatar* form data           */
/* -------------------------------------------------------------------------- */

const avatarFormValidator = new FormValidator(
  formConfig,
  variables.avatarModalForm
);
avatarFormValidator.enableValidation();
