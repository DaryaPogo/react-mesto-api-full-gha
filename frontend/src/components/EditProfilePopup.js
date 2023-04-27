import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="profile"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="popup__input popup__input_type_name"
        defaultValue={currentUser.name}
        name="name"
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
      />
      <span className="input-error-name"></span>
      <input
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        className="popup__input popup__input_type_job"
        defaultValue={currentUser.about}
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="input-error-job"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
