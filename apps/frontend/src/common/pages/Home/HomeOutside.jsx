import storefront from "../../../assets/homeArt/storefront.png";
import lamppost from "../../../assets/homeArt/lamppost.png";
import street from "../../../assets/homeArt/more_street.png";
import Hand from "../../../features/play/game/components/Hand";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeOutsideBlock from "./HomeOutsideBlock";
import Door from "./Door";
function HomeOutside() {
  return (
    <div className="size-full">
      <div className="relative size-full overflow-hidden">
        <div className="absolute right-3/18 bottom-0 size-40 origin-bottom scale-y-300 bg-amber-50"></div>

        <img
          className="pointer-events-none absolute right-0 bottom-0 z-0 h-9/10 select-none"
          src={storefront}
        />
        <Door />

        <img
          draggable={false}
          className="home_art_lamp absolute select-none h-full origin-bottom bottom-1 left-1/5 z-2"
          src={lamppost}
        />

        <div className="absolute top-3/10 left-1/10 flex flex-col gap-2 text-amber-100 select-none text-shadow-lg">
          <h1 className="z-10 text-6xl font-black">
            <span className="text-amber-800">Sit down</span>, play a game
          </h1>
          <h2 className="text-4xl font-black">
            You're at <span className="text-amber-800">Cafe Fordi</span>
          </h2>
        </div>

        <div className="absolute bottom-0 h-8 w-full bg-gray-500"></div>
        <div className="absolute bottom-5 left-1/2 flex h-15 w-10 items-center justify-center rounded-full cursor-pointer bg-amber-50/50 text-4xl font-black text-black duration-150 hover:bg-amber-200/60">
          {/* <img src={faArrowDown} alt="" /> */}
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </div>
      <HomeOutsideBlock />
    </div>
  );
}
export default HomeOutside;
