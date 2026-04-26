// import table from "./assets/table.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Board from "./board/Board";
import Pawn from "./components/Pawn";
import Card from "./components/Card";
import Timer from "./components/Timer";
import useSocket from "../../socket/hooks/useSocket";
import useSocketStore from "../../../stores/useSocketStore";
// import useGameStore from "../../../stores/useGameStore";
import Hand from "./components/Hand";

function GamePage() {
  const figs = Array("1").map((v) => (
    <Pawn key={v} isEven={v % 2 == 0} />
  ));

  const roomData = useSocketStore((state) => state.roomData);

  // const gameData = useGameStore((state) => state.gameData);

  const { finishGame } = useSocket();
  return (
    // <div className="multplayer__container">
    <div className="relative flex size-full flex-col items-center justify-end overflow-hidden p-2">
      {/* <img className="absolute origin-[50%_10%] scale-60 scale-y-150" src={table} /> */}
      {/* <img className="object-cover" src={table} /> */}
      <Board />
      <div className="absolute top-1/2 left-1/2 flex size-25 w-full -translate-1/2 justify-center">
        {figs}
      </div>
      <Hand />
      {/* <Timer /> */}
      {/* <h1 className="text-4xl font-bold text-black">GAME SCREEN</h1> */}
      <button
        onClick={() => finishGame({ roomID: roomData.id })}
        className="absolute right-2 bottom-2 size-fit cursor-pointer rounded bg-amber-50 px-4 py-2 font-bold text-black select-none"
      >
        FINISH GAME
      </button>
      {/* <div className="absolute top-1/2 left-0 bg-amber-50 size-50">{gameData}</div> */}
    </div>
  );
}
export default GamePage;
