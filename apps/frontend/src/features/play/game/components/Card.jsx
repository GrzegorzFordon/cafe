// import cardSprite from "../assets/a25-141-lightning-bolt.jpg";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import VFXCard from "./VFXCard";
/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */
function Card() {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.15, cursor: "grabbing" }}
      className="select-none"
    >
      <VFXCard />
    </motion.div>
  );
}
export default Card;
