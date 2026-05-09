import Tile from "../tile/Tile.jsx";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useBoardStore from "../stores/useBoardStore";
import Tiles from "../tile/Tiles.jsx";
import table from "../assets/table.webp";
import Units from "../units/Units.jsx";
// import { eventEmitter } from "@cafe/shared/eventEmitter.js";
// import useValidate from "../hooks/useValidate.js";

function Board() {
  const setBoardRef = useBoardStore((state) => state.setBoardRef);
  const ref = useRef();
  // const { getLegalMoves } = useValidate();
  useEffect(() => {
    setBoardRef(ref.current);
  }, [setBoardRef, ref]);

  // useEffect(() => {
  //   const handleResize = () => setBoardRef(ref.current);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [setBoardRef]);

  // const [legalTiles, setLegalTiles] = useState([]);

  // const handleUnitDragStart = (unit) => {
  //   console.log(unit);
  //   const result = getLegalMoves(unit);
  //   setLegalTiles(result);
  // };
  // const handleUnitDragEnd = (unit) => {
  //   console.log(unit);
  //   setLegalTiles([]);
  // };

  // useEffect(() => {
  //   eventEmitter.on("unit:drag:start", handleUnitDragStart);
  //   eventEmitter.on("unit:drag:end", handleUnitDragEnd);
  //   return () => {
  //     eventEmitter.off("unit:drag:start", handleUnitDragStart);
  //     eventEmitter.off("unit:drag:end", handleUnitDragEnd);
  //   };
  // });

  return (
    <motion.div
      dragMomentum={false}
      draggable="false"
      ref={ref}
      className="absolute top-3/7 left-1/2 flex -translate-1/2 flex-col items-center justify-center rounded text-2xl font-black text-black select-none"
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
    </motion.div>
  );
}
export default Board;
