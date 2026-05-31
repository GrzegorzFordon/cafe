import Tile from "../tile/Tile.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import useBoardStore from "../stores/useBoardStore";
import Tiles from "../tile/Tiles.jsx";
import table from "../assets/table.webp";
import Units from "../units/Units.jsx";
import SideBoard from "./SideBoard.jsx";
import eventBus from "../util/eventBus.js";

function Board() {
  const setBoardRef = useBoardStore((state) => state.setBoardRef);
  const ref = useRef();
  const [speed, setSpeed] = useState("x");

  useEffect(() => {
    setBoardRef(ref.current);
  }, [setBoardRef]);

  const handleEffect = useCallback(async (e) => {
    if (e.name === "Speed Changed Effect") {
      setSpeed(e.speed);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }, []);

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffect);
    return () => eventBus.unsubscribeToGameEffects(handleEffect);
  }, [handleEffect]);

  return (
    <div
      ref={ref}
      className="absolute scale-120 top-3/7 left-1/2 flex -translate-1/2 flex-col items-center justify-center rounded bg-green-500 text-2xl font-black text-black select-none"
    >
      <div
        draggable="false"
        className="TABLEIMAGE absolute top-1/2 left-1/2 size-140 -translate-1/2 scale-y-75 select-none"
        alt=""
      >
        <img draggable={false} className="select-none" src={table} alt="" />
      </div>
      <Tiles />
      <Units />
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, translateY: -25, opacity: 0 }}
          animate={{ scale: 1, translateY: 0, opacity: 1 }}
          exit={{ scale: 0, translateY: 25, opacity: 0 }}
          transition={{ duration: 0.3 }}
          key={speed}
          className="absolute top-1/2 -left-66 size-fit -translate-y-1/2 scale-y-70 rounded-sm p-2 text-3xl font-black text-red-950/90"
        >
          {speed}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default Board;
