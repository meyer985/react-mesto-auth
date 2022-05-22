import logo from "../../images/Logo_vector.svg";

function Header() {
  return (
    <header className="header">
      <a className="link">
        <img className="logo" src={logo} alt="логотип" />
      </a>
    </header>
  );
}

export default Header;
