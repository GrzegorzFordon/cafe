import { useCallback, useEffect, useState } from "react";
import eventBus from "../util/eventBus.js";
import Unit from "./Unit";

function Units() {
  const [units, setUnits] = useState([]);

  const handleEffectSpawn = useCallback(async (e) => {
    if (e.name != "Unit Spawned Effect") return;
    const clone = structuredClone(e.unit);
    setUnits((p) => [...p, clone]);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }, []);

  const handleEffectMove = useCallback(
    async (e) => {
      if (e.name != "Unit Moved Effect") return;
      const unit = units.find((val) => val.id == e.unitID);
      if (!unit) return;
      unit.hex = e.hex;
      setUnits((p) => p.filter((val) => val != unit));
      setUnits((p) => [...p, unit]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    [units],
  );
  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffectSpawn);
    return () => {
      eventBus.unsubscribeToGameEffects(handleEffectSpawn);
    };
  }, [handleEffectSpawn]);
  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffectMove);
    return () => {
      eventBus.unsubscribeToGameEffects(handleEffectMove);
    };
  }, [handleEffectMove]);

  const list = units.map((val) => <Unit key={val.id} unit={val} unitID={1} />);

  return (
    <div className="UNITS absolute top-1/2 left-1/2 -translate-1/2">{list}</div>
  );
}
export default Units;
