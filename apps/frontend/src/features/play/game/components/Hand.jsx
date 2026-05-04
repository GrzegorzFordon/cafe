import { useCallback, useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import { Reorder } from "motion/react";
import eventBus from "../util/eventBus.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Hand() {
  const [handOrder, setHandOrder] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const [cards, setCards] = useState([]);

  const handleCardEffect = useCallback(async (e) => {
    if (e.name == "Card Drawn Effect") {
      // console.log("[Hand] Caught: ", e.name);
      setCards((p) => [...p, e.card]);
      await new Promise((resolve) => setTimeout(resolve, 100));
    } else if (e.name == "Card Discarded Effect") {
      // console.log("[Hand] Caught: ", e.name);
      setCards((p) => p.filter((val) => val != e.card));
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }, []);

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleCardEffect);
    return () => eventBus.unsubscribeToGameEffects(handleCardEffect);
  }, [handleCardEffect]);

  const list = handOrder.map((val, i) => {
    return (
      cards.length > val && (
        <Card
          key={val}
          order={val}
          card={cards[val]}
          index={i / (cards.length - 1)}
        />
      )
    );
  });

  return (
    <motion.div className="w-fit">
      <Reorder.Group
        as="div"
        className="absolute -bottom-5 left-1/2 z-20 flex h-60 max-w-9/10 -translate-x-1/2 items-center justify-center gap-2"
        axis="x"
        values={handOrder}
        onReorder={setHandOrder}
      >
        {list}
      </Reorder.Group>
    </motion.div>
  );
}
export default Hand;
