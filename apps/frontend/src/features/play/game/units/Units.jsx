import { useCallback, useEffect, useMemo, useState } from "react";
import eventBus from "../util/eventBus.js";
import Unit from "./Unit";
import { Hex } from "@cafe/shared/util/hex.js";
import { useImmer } from "use-immer";
import { AnimatePresence } from "motion/react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Units() {
  // const [units, setUnits] = useState([]);

  const [units, setUnits] = useImmer([]);

  const handleEffectSpawn = useCallback(
    async (e) => {
      if (e.name === "Unit Spawned Effect") {
        console.log(e);
        //clone loses methods, so replace hex with new proper hex object TODO figure out cleaner answer
        const clone = structuredClone(e.unit);
        clone.hex = new Hex(clone.hex.q, clone.hex.r, clone.hex.s);
        setUnits((draft) => {
          draft.push(clone);
        });
        await new Promise((resolve) => setTimeout(resolve, 20));
      }

      if (e.name === "Unit Moved Effect") {
        await setUnits((draft) => {
          const unit = draft.find((val) => val.id === e.unitID);
          unit.hex = e.hex;
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      if (e.name === "Unit Damaged Effect") {
        setUnits((draft) => {
          const unit = draft.find((val) => val.id === e.unitID);
          unit.hp -= e.amount;
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (e.name === "Unit Died Effect") {
        setUnits((draft) => draft.filter((val) => val.id !== e.unitID));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (e.name === "Unit Modified Effect") {
        setUnits((draft) => {
          const unit = draft.find((val) => val.id === e.unitID);
          e.added
            ? unit.modifiers.push(e.modifier)
            : (unit.modifiers = unit.modifiers.filter(
                (val) => val.name !== e.modifier.name,
              ));
        });
        // console.log("[Frontend Units]", units);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    },
    [setUnits],
  );

  useEffect(() => {
    return () => {};
  }, [handleEffectSpawn]);

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffectSpawn);

    return () => {
      eventBus.unsubscribeToGameEffects(handleEffectSpawn);
    };
  }, [handleEffectSpawn]);

  const list = (
    <AnimatePresence>
      {units.map((val) => {
        return <Unit key={val.id} unit={val} unitID={1} />;
      })}
    </AnimatePresence>
  );

  return (
    <motion.div className="UNITS absolute top-1/2 left-1/2 -translate-1/2">
      {list}
    </motion.div>
  );
}
export default Units;
