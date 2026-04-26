import sprite from "../assets/hexagon_png.png";
import spriteActive from "../assets/hex_active.png";

/**
 * Client Tile component
 * Handles display based on props (different types, different status effects)
 */

function Tile({ coords, hoveredcoords }) {
  const isactive =
    coords.q === hoveredcoords.q &&
    coords.r === hoveredcoords.r &&
    coords.s === hoveredcoords.s;

  return (
    <div className="select-none">
      <img
        draggable="false"
        className="scale-220 scale-y-154"
        src={isactive ? spriteActive : sprite}
        alt=""
      />
      <div className="absolute top-1/2 left-1/2 flex -translate-1/2 flex-col text-sm font-light select-none">
        {/* <p>{isactive && "x"}</p> */}
      </div>
    </div>
  );
}
export default Tile;
