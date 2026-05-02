import useBoardStore from "../stores/useBoardStore";
import useBoard from "../hooks/useBoard.js";
import Tile from "./Tile.jsx";

function Tiles() {
  const tileSize = useBoardStore((state) => state.tileSize);
  const { positions, layout } = useBoard();

  return (
    <div className="TILES absolute top-1/2 left-1/2 -translate-1/2">
      {positions.map((val) => (
        <div
          draggable="false"
          className="absolute select-none"
          style={{
            left: val.x - tileSize * 0.5,
            top: val.y - tileSize * 0.5,
            width: tileSize,
            height: tileSize,
          }}
        >
          <Tile coords={layout.pixelToHexRounded(val)} />
        </div>
      ))}
    </div>
  );
}
export default Tiles;
