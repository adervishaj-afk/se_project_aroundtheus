import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
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
/*                  Pass form inputs to validate *Edit* form data             */
/* -------------------------------------------------------------------------- */

const profileEditFormValidator = new FormValidator(
  formConfig,
  //"#profile-edit-modal"
  variables.profileEditModalForm
);
profileEditFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                       Display the user info                                */
/* -------------------------------------------------------------------------- */

const editFormPopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  variables.editModalProfileSaveButton.textContent = "Saving...";
  api
    .updateUserProfile({
      name: formData.title,
      about: formData.description,
    })
    .then(() => {
      user.setUserInfo({
        name: formData.title,
        job: formData.description,
        avatar: user.getUserInfo().avatar,
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
      cardSection.renderCards();
    })
    .catch((error) => {
      console.error("Failed to fetch cards:", error);
    });
}

/* -------------------------------------------------------------------------- */
/*                  Pass form inputs to validate *Add* form data              */
/* -------------------------------------------------------------------------- */

const addModalFormValidator = new FormValidator(
  formConfig,
  //"#profile-add-modal"
  variables.addModalForm
);
addModalFormValidator.enableValidation();

/* -------------------------------------------------------------------------------------------- */
/*      Create new card and store the info in the server, then call to render card object       */
/* -------------------------------------------------------------------------------------------- */

function createNewCard(card) {
  variables.createCardButton.textContent = "Creating...";
  api
    .createCard(card)
    .then((cardData) => {
      cardSection.addItem(createCard(cardData));
      addCardPopup.close();
      variables.addModalForm.reset();
      addModalFormValidator.disableSubmitButton();
    })
    .catch((error) => {
      addModalFormValidator.enableSubmitButton();
      console.error("Failed to create new card", error);
    })
    .finally(() => {
      variables.createCardButton.textContent = "Create";
    });
}

/* -------------------------------------------------------------------------- */
/*               Call API to submit card info to be created                   */
/* -------------------------------------------------------------------------- */

const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  ({ title: name, link }) => {
    createNewCard({ name, link });
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
/*                  Pass form inputs to validate *Avatar* form data           */
/* -------------------------------------------------------------------------- */

const avatarFormValidator = new FormValidator(
  formConfig,
  variables.avatarModalForm
);
avatarFormValidator.enableValidation();

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
        user.updateAvatar(res.avatar);
        avatarPopupForm.close();
        variables.avatarModalForm.reset();
        avatarFormValidator.disableSubmitButton();
      })
      .catch((error) => {
        console.error("Failed to update user avatar:", error);
      })
      .finally(() => {
        variables.avatarModalSaveButton.textContent = "Save";
      });
  }
);

/* -------------------------------------------------------------------------- */
/*                   Edit Avatar Form Event Listener                          */
/* -------------------------------------------------------------------------- */

avatarPopupForm.setEventListeners();
variables.avatarChangeBut.addEventListener("click", () => {
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
    likeCardAPI,
    unlikeCardAPI
  );

  return newCard.getView();
}

/* -------------------------------------------------------------------------- */
/*              Handle like/dislike functionality callback                    */
/* -------------------------------------------------------------------------- */

const likeCardAPI = (cardData, changeLike) => {
  api
    .likeCard(cardData)
    .then(() => {
      changeLike.toggleLike();
      console.log("Card liked successfully.");
    })
    .catch((error) => {
      console.error("Failed to like card:", error);
    });
};
const unlikeCardAPI = (cardData, changeLike) => {
  api
    .unlikeCard(cardData)
    .then(() => {
      changeLike.toggleLike();
      console.log("Card disliked successfully.");
    })
    .catch((error) => {
      console.error("Failed to unlike card:", error);
    });
};

/* -------------------------------------------------------------------------- */
/*                     Delete card functionality callback                     */
/* -------------------------------------------------------------------------- */

const deleteCardModal = new ConfirmPopup({
  popupSelector: "#delete-card-modal",
});

/* -------------------------------------------------------------------------- */
/*                         Delete Modal Event Listener                        */
/* -------------------------------------------------------------------------- */

deleteCardModal.setEventListeners();

const handleDeleteCardButtonClick = (card) => {
  deleteCardModal.open();
  deleteCardModal.setSubmitAction(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCard();
        deleteCardModal.close();
        (data) => console.log(data);
      })
      .catch((error) => {
        console.error("Failed to delete card:", error);
      });
  });
};

/* -------------------------------------------------------------------------- */
/*                         Expand Image Event Listener                        */
/* -------------------------------------------------------------------------- */

const popupImage = new PopupWithImage("#element-popout-modal");
const handleImageClick = (cardData) => {
  popupImage.open(cardData);
};
popupImage.setEventListeners();
