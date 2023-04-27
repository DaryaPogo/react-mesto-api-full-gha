import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const imageRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: imageRef.current.value,
    });
  }

  React.useEffect(() => {
    imageRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        ref={imageRef}
        className="popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        required
      />
      <span className="input-error-avatar"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
