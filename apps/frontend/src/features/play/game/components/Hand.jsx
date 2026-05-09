import { useCallback, useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import { AnimatePresence, Reorder } from "motion/react";
import eventBus from "../util/eventBus.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const SEND_LOGS = false;

function Hand({playerID}) {
  const [cards, setCards] = useState([]);

  const handleEffectCARDS = useCallback(async (e) => {
    if (e.playerID != playerID) return;

    if (e.name == "Card Drawn Effect") {
      if (SEND_LOGS) console.log("[Hand] Caught: ", e);
      setCards((p) => [...p, e.card]);
      await new Promise((resolve) => setTimeout(resolve, 50));
    } else if (e.name == "Card Discarded Effect") {
      // console.log("[Hand] Caught: ", e.name);
      setCards((p) => p.filter((val) => val != e.card));
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }, []);

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffectCARDS);
    return () => eventBus.unsubscribeToGameEffects(handleEffectCARDS);
  }, [handleEffectCARDS]);

  const list = (
    <AnimatePresence>
      {cards.map((val, i) => {
        return (
          <Card
            key={val.id}
            order={val}
            card={val}
            index={i / (cards.length - 1)}
          />
        );
      })}
    </AnimatePresence>
  );

  return (
    <div className="w-fit">
      <Reorder.Group
        as="div"
        className="absolute -bottom-5 left-1/2 z-20 flex h-44 max-w-9/10 -translate-x-1/2 items-center justify-center gap-2"
        axis="x"
        values={cards}
        onReorder={setCards}
      >
        {list}
      </Reorder.Group>
    </div>
  );
}
export default Hand;
