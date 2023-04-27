import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, addPlace, isLoading}) {
  const [link, setLink] = React.useState("");
  const [place, setPlace] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addPlace({
      place,
      link,
    });
  }

  React.useEffect(() => {
    setLink("");
    setPlace("");
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="place"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        value={place || ""}
        onChange={(e) => setPlace(e.target.value)}
        type="text"
        className="popup__input popup__input_type_place"
        name="place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="input-error-place"></span>
      <input
        value={link || ""}
        onChange={(e) => setLink(e.target.value)}
        type="url"
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="input-error-link"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
