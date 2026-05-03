import Tile from "./Tile";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useBoardStore from "../stores/useBoardStore";
import Tiles from "./Tiles.jsx";
import table from "../assets/table.webp";

function Board() {
  const setBoardRef = useBoardStore((state) => state.setBoardRef);
  const ref = useRef();

  useEffect(() => {
    setBoardRef(ref.current);
  }, [setBoardRef, ref]);

  const [locked, setLocked] = useState(false);

  return (
    <motion.div
      // drag={!locked}
      dragMomentum={false}
      draggable="false"
      ref={ref}
      className="absolute top-2/5 left-1/2 flex -translate-1/2 flex-col items-center justify-center rounded text-2xl font-black text-black select-none"
    >
      <div
        draggable="false"
        className="TABLEIMAGE absolute top-1/2 left-1/2 size-140 -translate-1/2 scale-y-75 select-none"
        alt=""
      >
        <img draggable={false} className="select-none" src={table} alt="" />
      </div>
      <Tiles />
      {/* <input
        className="absolute -top-30 -left-50"
        type="checkbox"
        checked={locked}
        onChange={() => setLocked(!locked)}
      /> */}
    </motion.div>
  );
}
export default Board;
