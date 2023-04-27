import React from "react";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__wrapper-avatar">
          <button
            className="profile__btn"
            type="button"
            onClick={props.onEditAvatar}
          ></button>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__avatar"
          />
        </div>
        <div className="profile__wrapper">
          <div className="profile__rename">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__change"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__submit"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="card">
        <ul className="card__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
