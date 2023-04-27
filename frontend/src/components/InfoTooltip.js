import React from "react";
import err from "../images/error.svg";
import union from "../images/Union.svg";

export const InfoTooltip = (props) => {
  const { isOpen, onClose, status } = props;
  const text =
    status === false
      ? "Вы успешно зарегистрировались!"
      : "Что-то пошло не так! Попробуйте ещё раз.";
  const path = status === "err" ? err : union;
  return (
    <section className={`popup popup__white + ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__response">
          <img src={path} alt="ответ" />
          <p className="popup__response-title">{text}</p>
        </div>
      </div>
    </section>
  );
};
