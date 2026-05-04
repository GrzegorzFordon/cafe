// import * as VFX from "react-vfx";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, easeOut, motion, Reorder } from "motion/react";
import useCardList from "../hooks/useCardList";

function CardVisual({ card, order }) {
  const sprite = useCardList(card?.cardID);

  return (
    <motion.img
      key={order}
      draggable="false"
      src={sprite}
      alt=""
      className="size-fit object-scale-down select-none"
    />
  );
}
export default CardVisual;
