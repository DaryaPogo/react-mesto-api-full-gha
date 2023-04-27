import { apiConfig } from "../utils/utils";

export class API {
  constructor(config) {
    this.headers = config.headers;
    this.baseUrl = config.baseUrl;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._getResponse);
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._getResponse);
  }

  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponse);
  }

  addNewCard({ place, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: place,
        link: link,
      }),
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this.headers,
      }).then(this._getResponse);
    } else {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this.headers,
      }).then(this._getResponse);
    }
  }

  changeAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getResponse);
  }
}

const api = new API(apiConfig);
export default api;
