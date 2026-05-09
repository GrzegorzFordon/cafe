import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { useState, useEffect } from "react";
import useBoard from "../hooks/useBoard.js";
import Tile from "./Tile.jsx";
import useValidate from "../hooks/useValidate.js";
import { Hex } from "@cafe/shared/util/hex.js";

function Tiles() {
  const { hexList } = useBoard();
  const { getLegalMoves } = useValidate();
  const [legalTiles, setLegalTiles] = useState([]);

  const handleUnitDragStart = (unit) => {
    const result = getLegalMoves(unit);
    setLegalTiles(result);
  };
  const handleUnitDragEnd = () => {
    setLegalTiles([]);
  };

  useEffect(() => {
    eventEmitter.on("unit:drag:start", handleUnitDragStart);
    eventEmitter.on("unit:drag:end", handleUnitDragEnd);
    return () => {
      eventEmitter.off("unit:drag:start", handleUnitDragStart);
      eventEmitter.off("unit:drag:end", handleUnitDragEnd);
    };
  });

  const list = hexList.map((hex) => (
    <Tile
      key={JSON.stringify(hex)}
      hex={hex}
      isActive={legalTiles.some((val) => val.isEqual(hex))}
    />
  ));

  return (
    <div className="TILES absolute top-1/2 left-1/2 -translate-1/2">{list}</div>
  );
}
export default Tiles;
// !hex.isEqual(new Hex(0, 0, 0)) &&