import Tile from "./Tile";
import useBoard from "../hooks/useBoard";
import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, Reorder } from "motion/react";
import useBoardStore from "../../../../stores/useBoardStore";

function Board() {
  const setBoardRef = useBoardStore((state) => state.setBoardRef);
  const tileSize = useBoardStore((state) => state.tileSize);

  const ref = useRef();
  const { positions, layout } = useBoard();

  useEffect(() => {
    setBoardRef(ref.current);
  }, [setBoardRef, ref]);

  return (
    <motion.div
      drag
      dragMomentum="false"
      draggable="false"
      ref={ref}
      className="absolute top-3/7 left-1/2 z-20 flex -translate-1/2 flex-col items-center justify-center rounded bg-amber-500 text-2xl font-black text-black"
    >
      <div
        draggable="false"
        className="absolute size-150 max-h-72 rounded-2xl bg-amber-50"
      ></div>
      {positions.map((val) => (
        <div
          draggable="false"
          style={{
            position: "absolute",
            left: val.x - tileSize * 0.5,
            top: val.y - tileSize * 0.5,
            width: tileSize,
            height: tileSize,
          }}
          className="flex items-center justify-center select-none"
        >
          <Tile coords={layout.pixelToHexRounded(val)} />
        </div>
      ))}
    </motion.div>
  );
}
export default Board;
