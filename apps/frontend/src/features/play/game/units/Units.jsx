import { useCallback, useEffect, useState } from "react";
import eventBus from "../util/eventBus.js";
import Unit from "./Unit";

function Units() {
  const [units, setUnits] = useState([]);

  const handleUnitSpawn = useCallback(async (e) => {
    if (e.name != "Unit Spawned Effect") return;
    setUnits((p) => [...p, e.unit]);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }, []);

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleUnitSpawn);
    return () => eventBus.unsubscribeToGameEffects(handleUnitSpawn);
  }, [handleUnitSpawn]);

  const list = units.map((val) => <Unit key={val.id} unit={val} unitID={1} />);
  return (
    <div className="UNITS absolute top-1/2 left-1/2 -translate-1/2">{list}</div>
  );
}
export default Units;
