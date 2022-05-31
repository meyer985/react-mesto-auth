import logo from "../../images/Logo_vector.svg";
import { Link, useLocation, useHistory } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const history = useHistory();

  function hanleRedirect() {
    if (location.pathname === "/login") {
      history.push("/register");
    } else if (location.pathname === "/register") {
      history.push("/login");
    } else if (location.pathname === "/") {
      props.logOut();
    }
  }

  return (
    <header className="header">
      <a className="link" onClick={() => console.log(location)}>
        <img className="logo" src={logo} alt="логотип" />
      </a>
      <div className="header__menu">
        <p className="header__email">{props.email}</p>
        <Link className="header__link" onClick={hanleRedirect}>
          {location.pathname === "/"
            ? "Выйти"
            : location.pathname === "/register"
            ? "Войти"
            : "Регистрация"}
        </Link>
      </div>
    </header>
  );
}

export default Header;
