import useBoard from "../hooks/useBoard.js";
import Tile from "./Tile.jsx";

function Tiles() {
  const { hexList } = useBoard();
  const list = hexList.map((hex) => <Tile hex={hex} />);

  return (
    <div className="TILES absolute top-1/2 left-1/2 -translate-1/2">{list}</div>
  );
}
export default Tiles;
