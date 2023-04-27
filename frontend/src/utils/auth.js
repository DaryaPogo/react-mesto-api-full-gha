const BaseURL = "https://auth.nomoreparties.co";

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (data) => {
  return fetch(`${BaseURL}/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then(getResponse);
};

export const login = (data) => {
  return fetch(`${BaseURL}/signin`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then(getResponse);
};

export const checkToken = (token) => {
  return fetch(`${BaseURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};
