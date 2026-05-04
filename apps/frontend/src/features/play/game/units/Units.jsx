import { useCallback, useEffect, useState } from "react";
import eventBus from "../util/eventBus.js";
import Unit from "./Unit";

function Units() {
  const [units, setUnits] = useState([]);

  const handleGameEffect = useCallback(async (e) => {
    console.log("[Units] Caught: ", e);
    if (e.name == "Unit Spawned Effect") {
      // console.log("[Units] Spawn", e);
      setUnits((p) => [...p, structuredClone(e.unit)]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } else if (e.name == "Unit Moved Effect") {
      // console.log("[Units] Move", e);
      const unit = units.find((val) => val == unit);
      unit.hex = e.hex;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }, []);

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleGameEffect);
    return () => eventBus.unsubscribeToGameEffects(handleGameEffect);
  }, [handleGameEffect]);

  const list = units.map((val) => <Unit key={val.id} unit={val} unitID={1} />);
  return (
    <div className="UNITS absolute top-1/2 left-1/2 -translate-1/2">{list}</div>
  );
}
export default Units;
