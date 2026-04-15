import AuthButton from "../AuthButton/AuthButton";
import "./navBar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/cafe_logo.png";
import { useNavigate } from "react-router";
import ProfileCard from "../ProfileCard/ProfileCard";
import useAuthStore from "../../stores/useAuthStore";

function NavBar() {
  const navigate = useNavigate();

  const accessTokenData = useAuthStore((state) => state.accessTokenData);

  return (
    <nav className="navBar">
      <div className="navBar__leading">
        <button className="homeButton" onClick={() => navigate("/")}>
          <img src={logo} width={"80px"} />
        </button>

        <Link to={"/"}>Home</Link>
      </div>
      <div className="navBar__main">
        <Link to={"/cards"}>Cards</Link>
        <Link to={"/heroes"}>Heroes</Link>
        <Link to={"/rules"}>Rules</Link>

        <Link to={"/about"}>The Team</Link>
      </div>
      {accessTokenData && (
        <div className="navBar__main">
          <Link to={"/builder"}>Decks</Link>
          <Link to={"/mp"}>Play</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/shop"}>Shop</Link>
        </div>
      )}
      <div className="navBar__actions">
        {accessTokenData === undefined ? <AuthButton /> : <ProfileCard />}
      </div>
    </nav>
  );
}
export default NavBar;
