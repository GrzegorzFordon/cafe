import table from "./assets/table.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Board from "./components/board/Board";
import Pawn from "./components/pawn/Pawn";
import Card from "./components/card/Card";
import Timer from "./components/timer/Timer";

function GamePage() {
  // const figs = Array(1, 2, 3, 4, 5).map((v) => <Pawn key={v} />);
  // const cards = Array(1, 2, 3, 4, 5).map((v) => <Card key={v} />);


  return (
    // <div className="multplayer__container">
    <div className="flex size-full justify-center align-middle">
      {/* <img className="absolute origin-[50%_150%] scale-80" src={table} /> */}
      <img className="scale-80" src={table} />
      {/* <Board />
      {figs}
      {cards}
      <Timer /> */}
      <button className="absolute top-1/2 left-1/2 cursor-pointer rounded bg-amber-50 font-bold text-black select-none -translate-1/2">
        FINISH GAME
      </button>
    </div>
  );
}
export default GamePage;
