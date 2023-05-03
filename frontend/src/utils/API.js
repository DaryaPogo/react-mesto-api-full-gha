import { apiConfig } from "../utils/utils";

export class API {
  constructor(config) {
    this.baseUrl = config.adress;
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
      credentials: "include",
    }).then(this._getResponse);
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      credentials: "include",
    }).then(this._getResponse);
  }

  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponse);
  }

  addNewCard({ place, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: place,
        link: link,
      }),
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
    }).then(this._getResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }).then(this._getResponse);
    } else {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }).then(this._getResponse);
    }
  }

  changeAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getResponse);
  }
}

const api = new API(apiConfig);
export default api;
