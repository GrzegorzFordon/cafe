import { useMemo } from "react";
import useGameStore from "../stores/useGameStore";

const useUnits = () => {
  const mousedOverUnits = useGameStore((state) => state.mousedOverUnits);
  const addMousedOverUnit = useGameStore((state) => state.addMousedOverUnit);
  const removeMousedOverUnit = useGameStore(
    (state) => state.removeMousedOverUnit,
  );

  const firstMousedOverUnit = useMemo(() => {
    return mousedOverUnits[0] ?? null;
  }, [mousedOverUnits]);

  return { firstMousedOverUnit, addMousedOverUnit, removeMousedOverUnit };
};

export default useUnits;
