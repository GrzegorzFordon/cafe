// eslint-disable-next-line no-unused-vars
import { motion, Reorder, useMotionValue } from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useBoard from "../hooks/useBoard.js";
import useAction from "../hooks/useAction.js";
import PlayAction from "@cafe/engine/action/actions/play.action.js";
import { useMemo } from "react";

/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */

const MAX_HAND_FAN_ANGLE_DEGREES = 15;

function Card({ order, card, index }) {
  const { mousedOverHex, isHexWithinBoard } = useBoard();
  // const ref = useRef();
  // const mousePos = useMousePos();
  // const offset = useMotionValue();
  const { addActionObject, getActionsByCard } = useAction();
  const isBurn = useMotionValue(0);

  // const [dragStartMouseOffset, setDragStartMouseOffset] = useState({
  //   x: 0,
  //   y: 0,
  // });

  const actions = getActionsByCard(card);
  const isPlayed = useMemo(() => actions.length != 0, [actions.length]);
  const angle = MAX_HAND_FAN_ANGLE_DEGREES * (index - 0.5);

  const handlePlay = () => {
    if (isHexWithinBoard(mousedOverHex)) {
      const action = new PlayAction(card, mousedOverHex);
      addActionObject(action);
    } else if (isBurn.get()) {
      // addBurnCardAction(cardID)
    }
  };

  return (
    <Reorder.Item
      drag={!isPlayed}
      as="div"
      whileDrag={{ scale: 0.3, opacity: 0.7, cursor: "grabbing" }}
      key={order}
      value={order}
      onDragEnd={handlePlay}
      className="aspect-2.5/3.5 h-full w-full select-none"
    >
      <motion.div
        className="aspect-2.5/3.5 h-full w-full select-none"
        whileHover={
          isPlayed
            ? {}
            : {
                scale: 1.15,
                rotate: `${angle * 0.2}deg`,
              }
        }
        style={{
          rotate: `${angle}deg`,
          filter: isPlayed ? "brightness(0.4)" : "none",
        }}
      >
        <CardVisual cardID={card.cardID} />
      </motion.div>
    </Reorder.Item>
  );
}
export default Card;
