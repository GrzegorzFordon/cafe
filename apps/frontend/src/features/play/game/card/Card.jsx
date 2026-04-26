// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useGame from "../hooks/useGame.js";
import { useState } from "react";
import sprite from "../assets/a25-141-lightning-bolt.jpg";
/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */

function Card() {
  const { playCard, burnCard } = useGame();

  const [yDist, setYDist] = useState(0);

  const handlePlay = () => {};
  const handleBurn = () => {};

  return (
    <motion.div
      drag
      dragSnapToOrigin
      // dragElastic={0.1}
      dragMomentum={false}
      onDrag={(e, info) => setYDist(info.offset.y)}
      onDragEnd={(e, info) => {
        handlePlay();
        handleBurn();
      }}
      whileHover={{ scale: 1.05 , translateY:"-10px"}}
      whileDrag={{ scale: 0.5, cursor: "grabbing" }}
      className="relative select-none"
    >
      {/* <CardVisual /> */}
      <img className="object-contain h-fit" draggable="false" src={sprite} alt="" />
      <h1 className="absolute top-1/2 left-1/2 z-10 -translate-1/2 scale-90 text-2xl font-bold text-white">
        {/* {Math.round(yDist)} */}
      </h1>
    </motion.div>
  );
}
export default Card;
