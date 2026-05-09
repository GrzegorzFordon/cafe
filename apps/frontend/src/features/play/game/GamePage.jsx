import Board from "./board/Board";
import Hand from "./components/Hand";
import ActionDisplay from "./components/ActionDisplay";
import DebugWindow from "./components/DebugWindow";
import { useEffect } from "react";
import useGame from "./hooks/useGame";
import ActionPainter from "./components/ActionPainter";
import BurnDisplay from "./components/BurnDisplay";
import ActiveCardDisplay from "./components/ActiveCardDisplay";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function GamePage() {
  const { startGame } = useGame();
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="GAME-PAGE relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      <Hand playerID={1} />
      <ActionDisplay />
      <DebugWindow />
      <ActionPainter />
      <ActiveCardDisplay />
      {/* <BurnDisplay/> */}
    </div>
  );
}
export default GamePage;
