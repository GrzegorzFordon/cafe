import { useMemo } from "react";
import useGameStore from "../stores/useGameStore";
import { BURN_TYPES } from "@cafe/engine/config";

function BurnDisplay() {
  // const [expand, setExpand] = useState(false);

  const burnEffects = useGameStore((state) => state.burnEffects);
  // const usedBurnEffects = useGameStore((state) => state.usedBurnEffects);

  const powerCount = useMemo(() => {
    let count = 0;
    burnEffects.forEach(
      (val) =>
        (count += val.burnEffects.filter(
          (val) => val === BURN_TYPES.POWER,
        ).length),
    );
    return count;
  }, [burnEffects]);

  const speedCount = useMemo(() => {
    let count = 0;
    burnEffects.forEach(
      (val) =>
        (count += val.burnEffects.filter(
          (val) => val === BURN_TYPES.SPEED,
        ).length),
    );
    return count;
  }, [burnEffects]);

  const moveCount = useMemo(() => {
    let count = 0;
    burnEffects.forEach(
      (val) =>
        (count += val.burnEffects.filter(
          (val) => val === BURN_TYPES.MOVE,
        ).length),
    );
    return count;
  }, [burnEffects]);

  return (
    <div className="absolute top-1/3 left-2 flex flex-col items-start justify-start rounded-sm bg-amber-50 p-2 font-semibold text-black select-none">
      <div className="flex gap-2 font-bold">Burns</div>
      <p>Power Up: {powerCount}</p>
      <p>Speed Up: {speedCount}</p>
      <p>Move Up: {moveCount}</p>
    </div>
  );
}
export default BurnDisplay;
