import cardSprite from "../../assets/a25-141-lightning-bolt.jpg";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Card() {
  return (
    <motion.img
      className="absolute"
      drag
      dragElastic={0.6}
      dragMomentum={false}
      whileDrag={{ scale: 1.1 }}
      src={cardSprite}
    />
  );
}
export default Card;
