import Board from "./board/Board";
import Hand from "./components/Hand";
import ActionDisplay from "./components/ActionDisplay";
import DebugWindow from "./components/DebugWindow";
import { useCallback, useEffect } from "react";
import ActionPainter from "./components/ActionPainter";
import BurnDisplay from "./components/BurnDisplay";
import ActiveCardDisplay from "./components/ActiveCardDisplay";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import eventBus from "./util/eventBus";
import Deck from "./components/Deck";
import useSocketStore from "../../../stores/useSocketStore";
import useGameStore from "./stores/useGameStore";

function GamePage() {
  const setActionsSubAck = useSocketStore((state) => state.setActionsSubAck);
  const resetActions = useGameStore((state) => state.resetActions);

  const handleEffectGamePage = useCallback(
    async (e) => {
      if (e?.name !== "Game Advanced Effect") return;
      if (e?.phase !== "UPKEEP") return;
      console.log("Game Page", e);
      setActionsSubAck(false);
      resetActions();
    },
    [resetActions, setActionsSubAck],
  );

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffectGamePage);
    return () => eventBus.unsubscribeToGameEffects(handleEffectGamePage);
  }, [handleEffectGamePage]);

  return (
    <div className="GAME-PAGE relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      <Hand />
      {/* <ActionDisplay /> */}
      <DebugWindow />
      <ActionPainter />
      <ActiveCardDisplay />
      <BurnDisplay />
      <Deck />
    </div>
  );
}
export default GamePage;
