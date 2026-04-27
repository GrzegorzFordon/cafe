// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useGame from "../hooks/useGame.js";
import { useState } from "react";
import useBoard from "../hooks/useBoard.js";
/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */

function Card({ cardID }) {
  const { tryPlayCard, tryBurnCard } = useGame();
  const mousedOverHex = useBoard();
  const [yDist, setYDist] = useState(0);

  const handlePlay = () => {
    tryPlayCard(cardID, mousedOverHex);
  };
  const handleBurn = () => {};

  return (
    <motion.div
      // drag
      dragSnapToOrigin
      dragElastic={0.1}
      dragMomentum={false}
      onDrag={(e, info) => {
        setYDist(info.offset.y);
        // console.log(info.offset.x);
        // if (Math.abs(info.offset.x) > 50) swapOrder(cardID, 1);
      }}
      onDragEnd={(e, info) => {
        handlePlay();
        handleBurn();
        setYDist(0);
      }}
      whileHover={{ scale: 1.05, translateY: "-10px" }}
      whileDrag={{ scale: 0.5, cursor: "grabbing", zIndex: 10 }}
      className="relative select-none"
    >
      <CardVisual cardID={cardID} />
    </motion.div>
  );
}
export default Card;
