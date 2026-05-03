import Board from "./board/Board";
import Hand from "./components/Hand";
import ActionDisplay from "./components/ActionDisplay";
import DebugWindow from "./components/DebugWindow";

function GamePage() {
  return (
    <div className="GAME-PAGE relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      <Hand />
      {/* <ActionDisplay /> */}
      <DebugWindow />
    </div>
  );
}
export default GamePage;
