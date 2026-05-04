// eslint-disable-next-line no-unused-vars
import {
  AnimatePresence,
  easeOut,
  motion,
  Reorder,
  scale,
  useMotionValue,
} from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useBoard from "../hooks/useBoard.js";
import useAction from "../hooks/useAction.js";
import PlayAction from "@cafe/engine/action/actions/play.action.js";
import { useMemo } from "react";

/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */

const MAX_HAND_FAN_ANGLE_DEGREES = 10;

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
      key={card}
      value={order}
      onDragEnd={handlePlay}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, transition: { duration: 0.3 } }}
      transition={easeOut}
      className="aspect-2.5/3.5 h-full w-full select-none"
    >
      <motion.div
        className="aspect-2.5/3.5 h-full w-full select-none"
        key={card}
        whileHover={
          isPlayed
            ? {}
            : {
                scale: 1.15,
                rotate: `${angle * 0.2}deg`,
                transition: { duration: 0.1 },
              }
        }
        style={{
          rotate: `${angle}deg`,
          filter: isPlayed ? "brightness(0.4)" : "none",
        }}
      >
        <CardVisual key={order} order={order} card={card} />

        {/* <div className="absolute top-1/2 left-1/2 z-30 size-fit -translate-1/2 bg-amber-50 text-sm font-black text-black">
          <h1>Order: {order.cardID}</h1>
          <h1>Card: {card.cardID}</h1>
          <h1>Index: {Math.round(index * 100) / 100}</h1>
        </div> */}
      </motion.div>
    </Reorder.Item>
  );
}
export default Card;
