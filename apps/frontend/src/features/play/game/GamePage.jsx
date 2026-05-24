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
import GameController from "@cafe/engine/game/game.controller";
import _ from "lodash";
import SideBoard from "./board/SideBoard";
import useBoard from "./hooks/useBoard";

function GamePage() {
  const setActionsSubAck = useSocketStore((state) => state.setActionsSubAck);
  const resetActions = useGameStore((state) => state.resetActions);
  const resetUsedBurnEffects = useGameStore(
    (state) => state.resetUsedBurnEffects,
  );
  const { spawnsInfo } = useBoard();

  const handleEffectGamePage = useCallback(
    async (e) => {
      if (e?.name !== "Game Advanced Effect") return;
      if (e?.phase === "PLAN") {
        // console.log("Game Page", e);
        setActionsSubAck(false);
        resetActions();
        resetUsedBurnEffects();
      }
    },
    [resetActions, resetUsedBurnEffects, setActionsSubAck],
  );

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffectGamePage);
    return () => eventBus.unsubscribeToGameEffects(handleEffectGamePage);
  }, [handleEffectGamePage]);

  return (
    <div className="GAME-PAGE relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      {/* <SideBoard/> */}
      <Hand />
      <ActionDisplay />
      <DebugWindow />
      <ActionPainter />
      <ActiveCardDisplay />
      <BurnDisplay />
      <Deck />
      <span className="absolute top-1/2 left-1/2 z-50 bg-amber-50">
        {JSON.stringify(spawnsInfo)}
      </span>
    </div>
  );
}
export default GamePage;
