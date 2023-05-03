import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ImagePopup } from "./ImagePopup";
import api from "../utils/API";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { register, checkToken, login } from "../utils/auth";
import { InfoTooltip } from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [popupTooltipOpen, setPopupTooltipOpen] = useState(false);
  const [popupTooltipStatus, setPopupTooltipStatus] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  useEffect(() => {
    const loggedIn = localStorage.getItem("userId") 
    if (loggedIn) {
      api
        .getInfo()
        .then((currentUser) => {
          setCurrentUser(currentUser);
        })
        .catch((err) =>{
          localStorage.removeItem("userId")
          console.log(err)
        });
      api
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );

      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .editProfile({ name, about })
      .then((currentUser) => {
        setCurrentUser({ ...currentUser, name, about });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .changeAvatar({ avatar })
      .then((currentUser) => {
        setCurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ place, link }) {
    setIsLoading(true);
    api
      .addNewCard({ place, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleRegister(data) {
    return register(data)
      .then((res) => {
        setPopupTooltipStatus("success");
        navigate("/signin");
      })
      .catch(() => {
        setPopupTooltipStatus("err");
      })
      .finally(() => setPopupTooltipOpen(true));
  }

  function handleLogin(data) {
    return login(data)
      .then((res) => {
        if (res._id) {
          localStorage.setItem("userId", res._id);
          navigate("/");
          setLoggedIn(true);
          setEmail(data.email);
        }
      })
      .catch(() => {
        setPopupTooltipOpen(true);
        setPopupTooltipStatus("err");
      });
  }

  function handleSignout(token) {
    localStorage.removeItem("userId", token);
    navigate("/sing-up");
    setLoggedIn(false);
    setEmail("");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("userId");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onSubmit={handleSignout} email={email} />
      <Routes>
        <Route
          path="/signup"
          element={<Register onSubmit={handleRegister} />}
        />
        <Route path="/signin" element={<Login onSubmit={handleLogin} />} />

        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route
            path="/"
            element={
              <Main
                cards={cards}
                onEditAvatar={() => {
                  handleEditAvatarClick(true);
                }}
                onAddPlace={() => {
                  handleAddPlaceClick(true);
                }}
                onEditProfile={() => {
                  handleEditProfileClick(true);
                }}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
        </Route>
      </Routes>
      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        addPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />
      <PopupWithForm
        onClose={closeAllPopups}
        title="Вы уверены?"
        name="deleteProfile"
        buttonText="Да"
      />
      <InfoTooltip
        isOpen={popupTooltipOpen}
        onClose={() => {
          setPopupTooltipOpen(false);
          setPopupTooltipStatus(false);
        }}
        status={popupTooltipStatus}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
