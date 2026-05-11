import Board from "./board/Board";
import Hand from "./components/Hand";
import ActionDisplay from "./components/ActionDisplay";
import DebugWindow from "./components/DebugWindow";
import { useCallback, useEffect } from "react";
import useGame from "./hooks/useGame";
import ActionPainter from "./components/ActionPainter";
import BurnDisplay from "./components/BurnDisplay";
import ActiveCardDisplay from "./components/ActiveCardDisplay";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useSocket from "../../socket/hooks/useSocket";
import eventBus from "./util/eventBus";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import Deck from "./components/Deck";
import useSocketStore from "../../../stores/useSocketStore";

function GamePage() {
  // const { startGame, finishGame } = useGame();
  // useEffect(() => {
  //   startGame();
  //   return () => finishGame();
  // }, []);
  // const { finishGame } = useSocket();

  // const handleEffect = useCallback(async (e) => {
  //   console.log("Game Page", e);
  // }, []);

  // useEffect(() => {
  //   eventEmitter.on("game:start", handleEffect);
  //   return () => eventEmitter.off("game:start", handleEffect);
  // }, [handleEffect]);

  const roomData = useSocketStore((state) => state.roomData);

  return (
    <div className="GAME-PAGE relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      <Hand  />
      {/* <div className="absolute top-20 size-20 scale-50">
        <Hand playerID={roomData.players[1]?.id ?? roomData.players[0].id} />
      </div> */}
      <ActionDisplay />
      <DebugWindow />
      <ActionPainter />
      <ActiveCardDisplay />
      <BurnDisplay />
      <Deck />
    </div>
  );
}
export default GamePage;
