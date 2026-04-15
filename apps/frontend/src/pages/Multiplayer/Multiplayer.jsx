import "./multiplayer.css";
import board from "../../assets/game/board.png";
import table from "../../assets/game/table.png";
import cardhand from "../../assets/game/cardhand.png";
import figurine from "../../assets/game/figurine.png";
import { motion } from "motion/react";

function Multiplayer() {
  const figs = Array(1, 2, 3, 4, 5).map((v) => (
    <motion.img
      key={v}
      drag
      // onDrag={(event, info) => {
      //   console.log(info.point.x, info.point.y);
      // }}
      // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      // dragSnapToOrigin
      dragElastic={0.6}
      dragMomentum={false}
      whileDrag={{ scale: 1.1 }}
      className="multplayer_art_figurine"
      src={figurine}
    />
  ));

  console.log(figs);

  return (
    <div className="multplayer__container">
      <img className="home__image multplayer_art_table" src={table} />
      <img className="home__image multplayer_art_board" src={board} />
      <motion.img
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.1 }}
        className="multplayer_art_cardhand"
        src={cardhand}
      />
      <img
        className="home__image multplayer_art_cardhand_enemy"
        src={cardhand}
      />
      {figs}
    </div>
  );
}
export default Multiplayer;
