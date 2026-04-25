import cardSprite from "../../assets/a25-141-lightning-bolt.jpg";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Card() {
  return (
    <motion.img
      // className="cursor-pointer"
      drag
      dragElastic={0.6}
      onDrag={(e, info) => console.log(info.offset)}
      dragSnapToOrigin
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.15, cursor: "grabbing" }}
      src={cardSprite}
    />
  );
}
export default Card;
