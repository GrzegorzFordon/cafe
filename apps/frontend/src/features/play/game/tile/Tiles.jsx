import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { useState, useEffect, useCallback, useMemo } from "react";
import useBoard from "../hooks/useBoard.js";
import Tile from "./Tile.jsx";
import useValidate from "../hooks/useValidate.js";
import { Hex } from "@cafe/shared/util/hex.js";
import useSocket from "../../../socket/hooks/useSocket.js";
import eventBus from "../util/eventBus.js";
import { useImmer } from "use-immer";
import { SPELL_TARGET_TYPES } from "@cafe/engine/config.js";

function Tiles() {
  const { hexList, mousedOverHex } = useBoard();
  const { getLegalMoves, getLegalTargets } = useValidate();
  const [legalTiles, setLegalTiles] = useState([]);
  const [isCardDrag, setIsCardDrag] = useState(false);
  const [spawns, setSpawns] = useImmer(new Map());

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

  const handleCardDragStart = useCallback(
    (card) => {
      if (card.targetType !== SPELL_TARGET_TYPES.HEX) return;
      const result = getLegalTargets(card);
      setLegalTiles(result);
      // setIsCardDrag(1);
    },
    [getLegalTargets],
  );

  const handleCardDragEnd = () => {
    setLegalTiles([]);
    // setIsCardDrag(0);
  };

  const handleEffectTiles = useCallback(
    async (e) => {
      if (e.name === "Spawn Used Effect")
        // setSpawns(
        //   (p) => new Map(p.set(new Hex(e.hex.q, e.hex.r, e.hex.s), e.unit)),
        // );
        setSpawns((draft) =>
          draft.set(new Hex(e.hex.q, e.hex.r, e.hex.s), e.unit),
        );
      if (e.name === "Spawn Freed Effect")
        // setSpawns((p) => (p = p.delete(e.hex)));
        setSpawns((draft) => {
          const key = draft.keys().find((val) => val.isEqual(e.hex));
          draft.delete(key);
        });
      // await new Promise((resolve) => setTimeout(resolve, 1500));
    },
    [setSpawns],
  );

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffectTiles);
    return () => eventBus.unsubscribeToGameEffects(handleEffectTiles);
  }, [handleEffectTiles]);

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
  }, [handleCardDragStart, handleUnitDragStart]);

  const list = useMemo(
    () =>
      hexList.map((hex) => {
        const rotHex = isFirstPlayer ? hex : hex.mirror();
        const isActiveUnit = legalTiles.some((val) => val?.isEqual(rotHex));
        const centerHex = new Hex(0, 0, 0);
        const isSpawnInUse = spawns.keys().some((val) => val?.isEqual(rotHex));
        return (
          !hex.isEqual(centerHex) && (
            <Tile
              key={JSON.stringify(hex)}
              hex={hex}
              isActive={isActiveUnit}
              isMirrored={!isFirstPlayer}
              isSpawnInUse={isSpawnInUse}
            />
          )
        );
      }),
    [hexList, isFirstPlayer, legalTiles, spawns],
  );

  return (
    <div className="TILES absolute top-0 left-0 size-full -translate-1/2">
      {list}
    </div>
  );
}
export default Tiles;
// !hex.isEqual(new Hex(0, 0, 0)) &&
