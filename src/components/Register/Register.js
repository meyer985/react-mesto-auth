import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleInputPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleSubmitRegister(email, password);
    if (props.isRegistered) {
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__header">Регистрация</h2>
        <input
          name="email"
          type="text"
          className="auth__input auth__input_type_email"
          placeholder="Email"
          value={email}
          onChange={handleInputEmail}
        />
        <input
          name="password"
          type="password"
          className="auth__input auth__input_type_password"
          placeholder="Пароль"
          value={password}
          onChange={handleInputPassword}
        />
        <input
          type="submit"
          className="auth__submit"
          value="Зарегистрироваться"
        />
      </form>
      <Link className="auth__redirect" to="/login">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
