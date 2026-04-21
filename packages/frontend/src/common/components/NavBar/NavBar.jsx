import AuthButton from "../AuthButton/AuthButton";
import "./navBar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/cafe_logo.png";
import { useNavigate } from "react-router";
import ProfileCard from "../ProfileCard/ProfileCard";
import useAuthStore from "../../../stores/useAuthStore";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function NavBar() {
  const navigate = useNavigate();

  const accessTokenData = useAuthStore((state) => state.accessTokenData);

  return (
    <nav className="flex fixed top-4 bg-amber-800 rounded-sm w-95/100 justify-between gap-4 px-2 py-4 text-gray-100 font-bold decoration-0 h-12 z-1 shadow-md">
      <div className="flex items-center gap-8">
        <motion.img
          whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
          whileTap={{ scale: 1.05 }}
          className="cursor-pointer w-18"
          src={logo}
          onClick={() => navigate("/")}
        />
        <Link to={"/"}>Home</Link>
      </div>
      <div className="flex items-center gap-8">
        <Link to={"/cards"}>Cards</Link>
        <Link to={"/heroes"}>Heroes</Link>
        <Link to={"/rules"}>Rules</Link>
        <Link to={"/about"}>The Team</Link>
      </div>
      {accessTokenData && (
        <div className="flex items-center gap-8">
          <Link to={"/builder"}>Decks</Link>
          <Link to={"/mp"}>Play</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/shop"}>Shop</Link>
          <Link to={"/lobby"}>Lobby</Link>
        </div>
      )}
      <div className="flex items-center gap-8">
        {accessTokenData === undefined ? <AuthButton /> : <ProfileCard />}
      </div>
    </nav>
  );
}
export default NavBar;
