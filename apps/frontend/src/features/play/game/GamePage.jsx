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
import Units from "./units/units";

function GamePage() {
  const roomData = useSocketStore((state) => state.roomData);
  const { finishGame } = useSocket();

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      {/* <Units /> */}
      <Hand />
      {/* <BurnZone /> */}
      {/* <Timer /> */}
      <FinishGameButton callback={() => finishGame({ roomID: roomData.id })} />

      <div className="absolute left-0 z-10 size-fit rounded-2xl p-2 bg-amber-600 text-2xl text-black">
        {/* {JSON.stringify(mousePos)} */}
      </div>
    </div>
  );
}
export default GamePage;
