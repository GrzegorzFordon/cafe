// eslint-disable-next-line no-unused-vars
import { motion, Reorder, useMotionValue } from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useBoard from "../hooks/useBoard.js";
import useGame from "../hooks/useGame.js";
import { useState, useRef, useId, useMemo } from "react";
import useMousePos from "../hooks/useMousePos.js";
import useAction from "../hooks/useAction.js";

/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */

const MAX_HAND_FAN_ANGLE_DEGREES = 15;

function Card({ cardID, index }) {
  const id = useId();
  const ref = useRef();
  // const { tryPlayCard, tryBurnCard } = useGame();
  const { addPlayCardAction, addBurnCardAction, getActionsByID } = useAction();
  const mousePos = useMousePos();
  const { mousedOverHex } = useBoard();
  const isBurn = useMotionValue(0);

  // const [dragStartMouseOffset, setDragStartMouseOffset] = useState({
  //   x: 0,
  //   y: 0,
  // });

  const offset = useMotionValue();
  const myActions = useMemo(() => getActionsByID(id), [getActionsByID, id]);

  //const cardData = useCardCatalog(cardID);

  const angle = MAX_HAND_FAN_ANGLE_DEGREES * (index - 0.5);

  const handlePlay = () => {
    const isWithinBoard =
      Math.abs(mousedOverHex.q) < 4 &&
      Math.abs(mousedOverHex.r) < 4 &&
      Math.abs(mousedOverHex.s) < 4;
    if (isWithinBoard) {
      addPlayCardAction(id, cardID, mousedOverHex);
    } else if (isBurn.get()) addBurnCardAction(cardID);
  };

  return (
    <motion.div
      className="aspect-2.5/3.5 h-full w-full select-none"
      style={{ rotate: `${angle}deg` }}
      whileHover={{ scale: 1.1, rotate: `${angle*0.2}deg` }}
    >
      <CardVisual cardID={cardID} />
    </motion.div>
    // <Reorder.Item
    //   ref={ref}
    //   // item={orderItem}
    //   as="div"
    //   drag={myActions.length == 0}
    //   // dragElastic={0.1}
    //   // dragSnapToOrigin
    //   whileDrag={{
    //     scale: isBurn.get() == 1 ? 0.3 : 0.5,
    //     opacity: 0.5,
    //     // transformOrigin: dragStartMouseOffset,
    //     filter: isBurn.get() == 1 ? "brightness(0.4)" : "none",
    //     cursor: "grabbing",
    //   }}
    //   whileHover={{ scale: myActions.length > 0 ? 1.0 : 1.1, rotate: "0deg" }}
    //   // onDrag={(e, i) => {
    //   //   const rect = ref.current.getBoundingClientRect();
    //   //   // const cardPos = { x: rect.left, y: rect.top };
    //   //   // const cardSize = { width: rect.width, height: rect.height };
    //   //   offset.set({
    //   //     x: mousePos.x - rect.left + rect.width * 0.5,
    //   //     y: mousePos.y - rect.top + rect.height * 0.5,
    //   //   });
    //   //   isBurn.set(Math.abs(i.point.x) < 200 ? 1 : 0);
    //   // }}
    //   onDragEnd={() => {
    //     handlePlay();
    //     isBurn.set(false);
    //   }}
    //   key={orderItem}
    //   value={orderItem}
    //   className="aspect-2.5/3.5 h-full w-full select-none"
    //   style={{
    //     filter: myActions.length > 0 ? "brightness(0.4)" : "none",
    //     rotate: `${angle}deg`,
    //     // marginLeft: "-2em",
    //     // zIndex: 5,
    //   }}
    //   // style={{
    //   //   // transformOrigin: `${dragStartMouseOffset.x}px ${dragStartMouseOffset.y}px`,
    //   //   transformOrigin: offset.get()
    //   //     ? `${offset.get().x}px ${offset.get().y}px`
    //   //     : "50% 50%",
    //   // }}
    // >
    //   <CardVisual cardID={cardID} />
    //   {/* <h1 className="bg-red-500">{index}</h1> */}
    // </Reorder.Item>
  );
}
export default Card;

