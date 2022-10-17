import logo from "../../assets/stackline_logo.svg"
import "./Header.scss"

export const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
    </header>
  );
};

export default Header;
