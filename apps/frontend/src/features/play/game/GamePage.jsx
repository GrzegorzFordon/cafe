import Board from "./board/Board";
import Hand from "./components/Hand";
import ActionDisplay from "./components/ActionDisplay";
import DebugWindow from "./components/DebugWindow";
import useGame from "./hooks/useGame";
import { useEffect } from "react";
import eventBus from "./util/eventBus";

function GamePage() {
  const { advanceGame } = useGame();

  const handleGameEffect = (e) => {
    if (e.name != "Game Advanced Effect" || e.phase != "START") return;
    advanceGame();
  };

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleGameEffect);
    return () => eventBus.unsubscribeToGameEffects(handleGameEffect);
  });

  return (
    <div className="GAME-PAGE relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      <Hand />
      <ActionDisplay />
      <DebugWindow />
    </div>
  );
}
export default GamePage;
