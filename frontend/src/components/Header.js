import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/header__logo.svg";

function Header(props) {
  const { onSubmit, email } = props;
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />

      <Routes>
        <Route
          path="sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__wrapper">
              <p className="header__email">{email}</p>
              <Link
                onClick={onSubmit}
                to="/sign-in"
                className="header__link header__link_grey"
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
