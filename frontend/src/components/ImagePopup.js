import React from "react";
export const ImagePopup = (props) => {
  const { card, onClose } = props;
  return (
    <section className={`popup popup-image ${card && "popup_opened"}`}>
      <div className="popup__cotainer-image">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h3 className="popup__image-text">{card?.name}</h3>
      </div>
    </section>
  );
};
