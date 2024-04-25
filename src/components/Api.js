export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async fetchAPI(url, options) {
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return Promise.reject(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    });
  }

  // User Methods
  getUserInfo() {
    return this.fetchAPI(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
  }

  updateUserProfile({ name, about }) {
    return this.fetchAPI(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    });
  }

  updateUserAvatar({ avatar }) {
    return this.fetchAPI(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    });
  }

  // Card Methods
  getInitialCards() {
    return this.fetchAPI(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    });
  }

  createCard({ name, link }) {
    return this.fetchAPI(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this.fetchAPI(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  likeCard = (cardId) => {
    return this.fetchAPI(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  };

  unlikeCard = (cardId) => {
    return this.fetchAPI(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  };
}
