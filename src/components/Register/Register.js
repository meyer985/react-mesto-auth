function Register() {
  return (
    <div className="auth">
      <form className="auth__form">
        <h2 className="auth__header">Регистрация</h2>
        <input
          type="text"
          className="auth__input auth__input_type_email"
          placeholder="Email"
        ></input>
        <input
          type="text"
          className="auth__input auth__input_type_password"
          placeholder="Пароль"
        ></input>
        <input
          type="submit"
          className="auth__submit"
          value="Зарегистрироваться"
        ></input>
      </form>
      <a className="auth__link" href="#">
        Уже зарегистрированы? Войти
      </a>
    </div>
  );
}

export default Register;
