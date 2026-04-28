// eslint-disable-next-line no-unused-vars
import { motion, Reorder, useMotionValue } from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useBoard from "../hooks/useBoard.js";
import useGame from "../hooks/useGame.js";
import { useState, useRef } from "react";
import useMousePos from "../hooks/useMousePos.js";
import useIntent from "../hooks/useIntent.js";

/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */

function Card({ cardID, orderItem }) {
  const ref = useRef();
  // const { tryPlayCard, tryBurnCard } = useGame();
  const { addPlayCardIntent, addBurnCardIntent } = useIntent();
  const mousePos = useMousePos();
  const { mousedOverHex } = useBoard();
  const isBurn = useMotionValue(0);

  const [dragStartMouseOffset, setDragStartMouseOffset] = useState({
    x: 0,
    y: 0,
  });

  const offset = useMotionValue();

  const [isIntented, setIsIntented] = useState(false);

  //const cardData = useCardCatalog(cardID);

  const handlePlay = () => {
    const isWithinBoard =
      Math.abs(mousedOverHex.q) < 4 &&
      Math.abs(mousedOverHex.r) < 4 &&
      Math.abs(mousedOverHex.s) < 4;
    if (isWithinBoard) {
      const res = addPlayCardIntent(cardID, mousedOverHex);
      if (res) setIsIntented(true);
    } else if (isBurn.get()) addBurnCardIntent(cardID);
  };

  return (
    <Reorder.Item
      ref={ref}
      item={orderItem}
      as="div"
      drag={!isIntented}
      // dragElastic={0.1}
      // dragSnapToOrigin
      whileDrag={{
        scale: isBurn.get() == 1 ? 0.3 : 0.5,
        opacity: 0.5,
        // transformOrigin: dragStartMouseOffset,
        filter: isBurn.get() == 1 ? "brightness(0.4)" : "none",
        cursor: "grabbing",
      }}
      whileHover={{ scale: isIntented ? 1.0 : 1.2 }}
      // onDragStart={() => {
      //   const rect = ref.current.getBoundingClientRect();
      //   const cardPos = { x: rect.left, y: rect.top };
      //   const cardSize = { width: rect.width, height: rect.height };
      //   offset.set({
      //     x: mousePos.x - cardPos.x + cardSize.width * 0.5,
      //     y: mousePos.y - cardPos.y + cardSize.height * 0.5,
      //   });
      // }}
      onDrag={(e, i) => {
        const rect = ref.current.getBoundingClientRect();
        // const cardPos = { x: rect.left, y: rect.top };
        // const cardSize = { width: rect.width, height: rect.height };
        offset.set({
          x: mousePos.x - rect.left + rect.width * 0.5,
          y: mousePos.y - rect.top + rect.height * 0.5,
        });
        isBurn.set(Math.abs(i.point.x) < 200 ? 1 : 0);
      }}
      onDragEnd={() => {
        handlePlay();
        isBurn.set(false);
      }}
      key={orderItem}
      value={orderItem}
      className="relative size-fit rounded-md select-none"
      style={{ filter: isIntented ? "brightness(0.4)" : "none" }}
      // style={{
      //   // transformOrigin: `${dragStartMouseOffset.x}px ${dragStartMouseOffset.y}px`,
      //   transformOrigin: offset.get()
      //     ? `${offset.get().x}px ${offset.get().y}px`
      //     : "50% 50%",
      // }}
    >
      <CardVisual cardID={cardID} />
    </Reorder.Item>
  );
}
export default Card;

//transform: "translateY(-10px)"
