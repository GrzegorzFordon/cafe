// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Board from "./board/Board";
import Card from "./Card/Card";
import Timer from "./components/Timer";
import useSocket from "../../socket/hooks/useSocket";
import useSocketStore from "../../../stores/useSocketStore";
// import useGameStore from "../../../stores/useGameStore";
import Hand from "./components/Hand";
import BurnZone from "./components/BurnZone";
import FinishGameButton from "./ui/FinishGameButton";
import Units from "./units/Units";
import Unit from "./units/Unit";
import IntentDisplay from "./components/IntentDisplay";

function GamePage() {
  const roomData = useSocketStore((state) => state.roomData);
  const { finishGame } = useSocket();
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      <Hand />
      {/* <BurnZone /> */}
      {/* <Timer /> */}
      {/* <Units /> */}
      <IntentDisplay />
      <FinishGameButton callback={() => finishGame({ roomID: roomData.id })} />
      {/* <Unit/> */}
    </div>
  );
}
export default GamePage;
