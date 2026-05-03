import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../Card/Card.jsx";
import { Reorder } from "motion/react";
import eventBus from "../util/eventBus.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import CardVisual from "../Card/CardVisual.jsx";

function Hand() {
  const [handOrder, setHandOrder] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const [cards, setCards] = useState([]);

  const handleCardDrawn = useCallback(async (e) => {
    if (e.name != "Card Drawn Effect") return;
    console.log("Hand hears new card", e);
    setCards((p) => [...p, e.card]);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }, []);

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleCardDrawn);
    return () => eventBus.unsubscribeToGameEffects(handleCardDrawn);
  }, [handleCardDrawn]);

  const list = handOrder.map((val, i) => {
    return (
      cards.length > val && (
        <Reorder.Item
          as="div"
          drag
          whileDrag={{ scale: 0.5, opacity: 0.7, cursor: "grabbing" }}
          key={val}
          value={val}
          className="aspect-2.5/3.5 h-full w-full select-none"
        >
          <Card cardID={cards[val]?.cardID} index={i / (cards.length - 1)} />
        </Reorder.Item>
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

/*


/**
 *     <Reorder.Group
      as="div"
      className="absolute bottom-5 left-1/2 z-20 flex h-48 w-9/10 -translate-x-1/2 items-center justify-center gap-1 bg-amber-50 p-2"
      axis="x"
      values={list}
      onReorder={setHandOrder}
    >
      {/* <img
        src={handSprite}
        draggable={false}
        alt=""
        className="absolute top-1/2 left-1/2 -translate-1/2 scale-x-175"
      // /> 
       {handOrder.map((item) => (
        <Card key={item} cardID={item} orderItem={item} />
      ))} 
//       {list}
//     </Reorder.Group>

*/
