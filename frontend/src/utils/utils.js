export const formValidationSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/cohort-56",
  headers: {
    authorization: "20d35879-9615-41b1-8abb-77eae2aa9639",
    "Content-Type": "application/json",
  },
};
