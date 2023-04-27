import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {onSubmit} = props;

  const handleSubmit = useCallback( (e)=> {
    e.preventDefault();
    const formData = {
      email,
      password,
    }
    onSubmit(formData);
  }, [email, password, onSubmit]);

  return (
    <div className="register">
      <p className="register__welcome">Регистрация</p>
      <form onSubmit={handleSubmit}
        className="register__form"
      >
        <input
          className="register__input"
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="register__login-link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
};

export default Register;
