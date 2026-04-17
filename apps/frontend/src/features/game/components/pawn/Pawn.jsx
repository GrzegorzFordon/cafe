import pawnSprite from "../../assets/figurine.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Pawn() {
  return (
    <motion.img
      drag
      // onDrag={(event, info) => {
      //   console.log(info.point.x, info.point.y);
      // }}
      // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      // dragSnapToOrigin
      dragElastic={0.6}
      dragMomentum={false}
      whileDrag={{ scale: 1.1 }}
      className="absolute"
      src={pawnSprite}
    />
  );
}
export default Pawn;
