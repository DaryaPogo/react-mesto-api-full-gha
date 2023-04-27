import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup-${name}  + ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <form
          onSubmit={onSubmit}
          className="popup__form popup__form-profile"
          name={name}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
