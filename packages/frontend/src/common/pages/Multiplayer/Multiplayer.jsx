import table from "../../features/game/assets/table.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Board from "../../features/game/components/board/Board";
import Pawn from "../../features/game/components/pawn/Pawn";
import Card from "../../features/game/components/card/Card";
import Timer from "../../features/game/components/timer/Timer";

function Multiplayer() {
  const figs = Array(1, 2, 3, 4, 5).map((v) => <Pawn key={v} />);
  const cards = Array(1, 2, 3, 4, 5).map((v) => <Card key={v} />);

  console.log(figs);

  return (
    // <div className="multplayer__container">
    <div className="flex size-full justify-center align-middle">
      <img className=" absolute scale-80 origin-[50%_150%]" src={table} />
      <Board />
      {figs}
      {cards}
      <Timer />
    </div>
  );
}
export default Multiplayer;
