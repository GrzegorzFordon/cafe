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
import ActionDisplay from "./components/ActionDisplay";
import { useEffect } from "react";
import { eventEmitter } from "../../../util/eventEmitter";
import GameButton from "./ui/GameButton";
import DebugWindow from "./components/DebugWindow";

function GamePage() {
  const roomData = useSocketStore((state) => state.roomData);

  const handleDragStart = (id, unitID) =>
    console.log("Unit Drag Start:", id, unitID);
  const handleDragEnd = (id, unitID, target) =>
    console.log("Unit Drag End:", id, unitID, target);

  useEffect(() => {
    eventEmitter.on("unit:dragStart", handleDragStart);
    eventEmitter.on("unit:dragEnd", handleDragEnd);
    return () => {
      eventEmitter.off("unit:dragStart", handleDragStart);
      eventEmitter.off("unit:dragEnd", handleDragEnd);
    };
  });

  const { finishGame } = useSocket();

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden p-2">
      <Board />
      <Hand />
      {/* <BurnZone /> */}
      {/* <Timer /> */}
      {/* <Units /> */}
      <ActionDisplay />
      <FinishGameButton callback={() => finishGame({ roomID: roomData.id })} />
      <DebugWindow />
      {/* <Unit/> */}
    </div>
  );
}
export default GamePage;
