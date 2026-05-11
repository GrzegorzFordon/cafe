import { useCallback, useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import { AnimatePresence, Reorder } from "motion/react";
import eventBus from "../util/eventBus.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useAction from "../hooks/useAction.js";
import useSocketStore from "../../../../stores/useSocketStore.js";

const SEND_LOGS = 0;

function Hand({playerID}) {
  const [cards, setCards] = useState([]);
  const { isCardBurned, hasActionsOfType } = useAction();
  const socketID = useSocketStore((state) => state.socketID);

  const handleEffect = useCallback(
    async (e) => {
      // console.log("[Hand]", socketID, e.playerID?.id, socketID === e.playerID?.id);
      if (socketID !== e.playerID?.id) return;

      if (e.name == "Card Drawn Effect") {
        if (SEND_LOGS) console.log("[Hand] Caught Draw: ", e);
        setCards((p) => [...p, e.card]);
        await new Promise((resolve) => setTimeout(resolve, 10));
      } else if (e.name == "Card Discarded Effect") {
        if (SEND_LOGS) console.log("[Hand] Caught Discard: ", e);
        setCards((p) => p.filter((val) => val.id != e.card.id));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    },
    [socketID],
  );

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffect);
    return () => eventBus.unsubscribeToGameEffects(handleEffect);
  }, [handleEffect]);

  const list = (
    <AnimatePresence>
      {cards.map((val, i) => {
        return (
          !isCardBurned(val) &&
          !hasActionsOfType(val.id, "PLAY") && (
            <Card
              key={val.id}
              order={val}
              card={val}
              index={i / (cards.length - 1)}
            />
          )
        );
      })}
    </AnimatePresence>
  );

  return (
    <div className="flex w-fit flex-col">
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
