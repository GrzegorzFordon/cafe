// eslint-disable-next-line no-unused-vars
import { motion, Reorder } from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useBoard from "../hooks/useBoard.js";
// import useGame from "../hooks/useGame.js";

/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */

function Card({ cardID, orderItem }) {
  // const { tryPlayCard, tryBurnCard } = useGame();
  // const [yDist, setYDist] = useState(0);

  // const handlePlay = () => {
  //   // tryPlayCard(cardID, mousedOverHex);
  // };

  // const handleBurn = () => {};

  // const [dragged, setDragged] = useState(false);

  const { mousedOverHex } = useBoard();

  return (
    <Reorder.Item
      item={orderItem}
      as="div"
      drag
      dragElastic={0.1}
      dragSnapToOrigin
      whileDrag={{ scale: 0.6, cursor: "grabbing" }}
      onDragEnd={() => {
        console.log("card play: ", cardID, mousedOverHex);
      }}
      key={orderItem}
      value={orderItem}
    >
      <CardVisual
        cardID={cardID}
        whileHover={{ scale: 1.05, translateY: "-10px" }}
      />
    </Reorder.Item>
  );
}
export default Card;
