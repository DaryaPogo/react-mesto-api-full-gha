import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
    console.log(card.likes);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  return (
    <li className="card__item">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && <button className="card__delete" onClick={handleDeleteClick} type="button" />}
      <div className="card__name">
        <h3 className="card__text">{card.name}</h3>
        <div className="card__wrapper">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="card__like-quantity">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};
