import Tile from "../tile/Tile.jsx";
import { useCallback, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useBoardStore from "../stores/useBoardStore";
import Tiles from "../tile/Tiles.jsx";
import table from "../assets/table.webp";
import Units from "../units/Units.jsx";
import SideBoard from "./SideBoard.jsx";

function Board() {
  const setBoardRef = useBoardStore((state) => state.setBoardRef);
  const ref = useRef();

  useEffect(() => {
    setBoardRef(ref.current);
  }, [setBoardRef]);

  return (
    <div
      ref={ref}
      className="absolute top-3/7 left-1/2 flex -translate-1/2 flex-col items-center justify-center rounded bg-green-500 text-2xl font-black text-black select-none"
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
      <div className="absolute top-1/2 -left-66 size-fit -translate-y-1/2 scale-y-70 rounded-sm p-2 text-3xl font-black text-red-950/90">
        3
      </div>
    </div>
  );
}
export default Board;
