import { useState } from "react";

function Login(props) {
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
    props.handleSubmitLogin(email, password);
    if (props.isLoggedIn) {
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__header">Вход</h2>
        <input
          type="text"
          className="auth__input auth__input_type_email"
          placeholder="Email"
          value={email}
          onChange={handleInputEmail}
        />
        <input
          type="password"
          className="auth__input auth__input_type_password"
          placeholder="Пароль"
          value={password}
          onChange={handleInputPassword}
        />
        <input type="submit" className="auth__submit" value="Войти" />
      </form>
    </div>
  );
}

export default Login;
