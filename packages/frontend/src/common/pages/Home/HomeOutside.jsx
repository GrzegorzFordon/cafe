import storefront from "../../../assets/homeArt/storefront.png";
import lamppost from "../../../assets/homeArt/lamppost.png";
import street from "../../../assets/homeArt/more_street.png";

function HomeOutside() {
  return (
    <div className="home__container">
      <img className="absolute home_art_front" src={storefront} />
      <img className="absolute home_art_lamp" src={lamppost} />
      <img className="absolute home_art_street" src={street} />
      <div className="tagContainer">
        <h1 className="mainLine">Sit down, play a game.</h1>
        <h2 className="secondLine">You're at Cafe Fordi.</h2>
      </div>
      {/* <button
        className="h-20/100 w-20/100 z-10 bg-red-600 "
        onClick={handleClick}
      >
        SOCKET
      </button> */}
    </div>
  );
}
export default HomeOutside;
