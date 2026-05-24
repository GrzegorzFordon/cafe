import { useEffect, useState } from "react";
import CardVisual from "../card/CardVisual";
import eventBus from "../util/eventBus";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";

function ActiveCardDisplay() {
  const [activeCard, setActiveCard] = useState();

  const handleEffectActiveCard = async (e) => {
    if (e.name !== "Card Resolving Effect") return;
    setActiveCard(e.card);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await setTimeout(() => {
      setActiveCard(undefined);
    }, 500);
  };

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffectActiveCard);
    return () => eventBus.unsubscribeToGameEffects(handleEffectActiveCard);
  },[]);

  return (
    <AnimatePresence>
      {activeCard && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute top-1/3 left-1/5 -translate-1/2 scale-20"
        >
          <CardVisual card={activeCard} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default ActiveCardDisplay;
