import { useCallback, useEffect, useState } from "react";
import useSocketStore from "../../../../stores/useSocketStore.js";
import eventBus from "../util/eventBus";

function Deck() {
  const socketID = useSocketStore((state) => state.socketID);
  const [cardsLeftInDeck, setCardsLeftInDeck] = useState(0);

  const handleEffect = useCallback(
    async (e) => {
      // console.log("[Hand]", socketID, e.playerID?.id, socketID === e.playerID?.id);
      if (socketID !== e.playerID?.id) return;

      if (e.name == "Card Drawn Effect") {
        setCardsLeftInDeck(e.cardsInDeckAmount ?? 0);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    },
    [socketID],
  );

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffect);
    return () => eventBus.unsubscribeToGameEffects(handleEffect);
  }, [handleEffect]);

  return (
    <div className="absolute bottom-0 left-10 flex size-10 items-center justify-center rounded-2xl bg-amber-50 text-2xl font-black text-black select-none">
      {cardsLeftInDeck}
    </div>
  );
}
export default Deck;
