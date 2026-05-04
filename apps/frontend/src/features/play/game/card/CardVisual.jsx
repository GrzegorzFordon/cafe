// import * as VFX from "react-vfx";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, easeOut, motion, Reorder } from "motion/react";
import useCardList from "../hooks/useCardList";

function CardVisual({ cardID }) {
  const sprite = useCardList(cardID);

  return (
    <AnimatePresence>
      <motion.img
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        exit={{ scale: 0 }}
        transition={easeOut}
        draggable="false"
        src={sprite}
        alt=""
        className="size-fit object-scale-down select-none"
      />
    </AnimatePresence>
  );
}
export default CardVisual;
