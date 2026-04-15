import "./home.css";
// import image from "../../assets/home.png";
import storefront from "../../assets/homeArt/storefront.png";
import lamppost from "../../assets/homeArt/lamppost.png";
import street from "../../assets/homeArt/more_street.png";

function Home() {
  return (
    <div className="home__container">
      {/* <img className="home__mainImage" src={image} width={"60%"} /> */}
      <img className="home__image home_art_front" src={storefront}  />
      <img className="home__image home_art_lamp" src={lamppost}  />
      <img className="home__image home_art_street" src={street}  />
      <div className="tagContainer">
        <h1 className="mainLine">Sit down, play a game.</h1>
        <h2 className="secondLine">You're at Cafe Fordi.</h2>
      </div>
    </div>
  );
}
export default Home;
