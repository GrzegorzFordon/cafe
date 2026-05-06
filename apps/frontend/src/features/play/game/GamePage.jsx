import Board from "./board/Board";
import Hand from "./components/Hand";
import ActionDisplay from "./components/ActionDisplay";
import DebugWindow from "./components/DebugWindow";
import { useEffect } from "react";
import useGame from "./hooks/useGame";
import ActionPainter from "./components/ActionPainter";

function GamePage() {
  const { startGame } = useGame();
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="GAME-PAGE relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      <Hand />
      <ActionDisplay />
      <DebugWindow />
      <ActionPainter />
    </div>
  );
}
export default GamePage;
