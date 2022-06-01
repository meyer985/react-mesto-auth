import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../../utils/auth";

function Register(props) {
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
      .register(email, password)
      .then((res) => {
        if (res.ok) {
          history.push("/login");
          props.throwSuccess();
          setEmail("");
          setPassword("");
        } else {
          props.throwMistake();
        }
      })
      .catch((res) => console.log(res));
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
          type="text"
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
