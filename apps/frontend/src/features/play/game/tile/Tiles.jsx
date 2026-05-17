import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { useState, useEffect, useCallback, useMemo } from "react";
import useBoard from "../hooks/useBoard.js";
import Tile from "./Tile.jsx";
import useValidate from "../hooks/useValidate.js";
import { Hex } from "@cafe/shared/util/hex.js";
import useSocket from "../../../socket/hooks/useSocket.js";

function Tiles() {
  const { hexList, mousedOverHex } = useBoard();
  const { getLegalMoves } = useValidate();
  const [legalTiles, setLegalTiles] = useState([]);
  const [isCardDrag, setIsCardDrag] = useState(false);

  const { isFirstPlayer } = useSocket();

  const handleUnitDragStart = useCallback(
    (unit) => {
      const result = getLegalMoves(unit);
      setLegalTiles(result);
    },
    [getLegalMoves],
  );

  const handleUnitDragEnd = () => {
    setLegalTiles([]);
  };

  const handleCardDragStart = () => {
    console.log("drag start");
    setIsCardDrag(1);
  };

  const handleCardDragEnd = () => {
    setIsCardDrag(0);
  };

  useEffect(() => console.log(isCardDrag), [isCardDrag]);

  useEffect(() => {
    eventEmitter.on("unit:drag:start", handleUnitDragStart);
    eventEmitter.on("unit:drag:end", handleUnitDragEnd);
    eventEmitter.on("card:drag:start", handleCardDragStart);
    eventEmitter.on("card:drag:end", handleCardDragEnd);
    return () => {
      eventEmitter.off("unit:drag:start", handleUnitDragStart);
      eventEmitter.off("unit:drag:end", handleUnitDragEnd);
      eventEmitter.off("card:drag:start", handleCardDragStart);
      eventEmitter.off("card:drag:end", handleCardDragEnd);
    };
  }, [handleUnitDragStart]);

  const list = useMemo(
    () =>
      hexList.map((hex) => {
        const isActiveUnit = legalTiles.some((val) => val.isEqual(hex));
        const isActiveCard = isCardDrag && mousedOverHex.isEqual(hex);
        const isActive = isActiveUnit || isActiveCard;
        const centerHex = new Hex(0, 0, 0);
        return (
          !hex.isEqual(centerHex) && (
            <Tile
              key={JSON.stringify(hex)}
              hex={hex}
              isActive={isActive}
              isMirrored={!isFirstPlayer}
            />
          )
        );
      }),
    [hexList, isCardDrag, isFirstPlayer, legalTiles, mousedOverHex],
  );

  return (
    <div className="TILES absolute top-0 left-0 size-full -translate-1/2">
      {list}
    </div>
  );
}
export default Tiles;
// !hex.isEqual(new Hex(0, 0, 0)) &&
