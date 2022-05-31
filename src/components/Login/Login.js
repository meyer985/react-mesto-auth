import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../../utils/auth";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleInputEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleInputPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth
      .auth(email, password)
      .then((data) => {
        if (data) {
          props.handleLogin();
          history.push("/");
        } else {
          console.log("не туть");
        }
      })
      .catch((err) => console.log(err));
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
          type="text"
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
