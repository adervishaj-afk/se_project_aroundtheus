export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  fetchAPI(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Get initial cards
  getInitialCards() {
    return this.fetchAPI(`${this.baseUrl}/cards`, {
      headers: this.headers,
    });
  }

  // Get user information
  getUserInfo() {
    return this.fetchAPI(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

  // Update user profile
  updateUserProfile({ name, about }) {
    return this.fetchAPI(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    });
  }

  // Update user avatar
  updateUserAvatar({ avatar }) {
    return this.fetchAPI(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    });
  }

  // Create new card
  createCard({ name, link }) {
    return this.fetchAPI(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    });
  }

  // Delete a card
  deleteCard(cardId) {
    return this.fetchAPI(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  // Like a card
  likeCard(cardId) {
    return this.fetchAPI(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  // Unlike a card
  unlikeCard(cardId) {
    return this.fetchAPI(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}
