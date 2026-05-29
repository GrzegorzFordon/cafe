// import * as VFX from "react-vfx";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, easeOut, motion, Reorder } from "motion/react";
// import { useMemo } from "react";
// import useCardList from "../hooks/useCardList";
function CardVisual({ card, order }) {
  // const sprite = useCardList(card?.cardID);
  const spritePath = async () => {
    const path = `../assets/cards/${card?.cardID ?? "def"}.png`;
    return await import(path);
  };

  return (
    <motion.img
      key={order}
      draggable="false"
      src={spritePath}
      alt={card?.cardID}
      className="size-fit object-scale-down select-none"
    />
  );
}
export default CardVisual;
