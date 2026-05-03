import useBoardStore from "../stores/useBoardStore";
import useBoard from "../hooks/useBoard.js";
import Tile from "./Tile.jsx";
import { useCallback, useEffect, useState } from "react";
import eventBus from "../util/eventBus.js";

function Tiles() {
  const tileSize = useBoardStore((state) => state.tileSize);
  const { positions, layout } = useBoard();

  const [units, setUnits] = useState([]);

  const handleUnitSpawn = useCallback(async (e) => {
    if (e.name != "Unit Spawned Effect") return;
    // console.log("Tiles hear new unit", e);
    setUnits((p) => [...p, e.unit]);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }, []);

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleUnitSpawn);
    return () => eventBus.unsubscribeToGameEffects(handleUnitSpawn);
  }, [handleUnitSpawn]);

  const list = positions.map((val) => {
    const coords = layout.pixelToHexRounded(val);
    const unit = units.find((u) => u.coords.isEqual(coords));
    return (
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
        <Tile coords={coords} unit={unit} />
      </div>
    );
  });

  return (
    <div className="TILES absolute top-1/2 left-1/2 -translate-1/2">
      {/* {positions.map((val) => (
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
          <Tile
            coords={layout.pixelToHexRounded(val)}
            // unit={units.find((u) =>
            //   u.coords.isEqual(layout.pixelToHexRounded(val)),
            // )}
          />
        </div>
      ))} */}
      {list}
    </div>
  );
}
export default Tiles;
