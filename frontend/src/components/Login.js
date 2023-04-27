import React, { useState, useCallback } from "react";

const Login = (props) => {
  const {onSubmit} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <p className="register__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register__input"
          placeholder="Пароль"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="register__button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
