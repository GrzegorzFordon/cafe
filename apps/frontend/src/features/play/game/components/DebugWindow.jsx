import useGame from "../hooks/useGame";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import GameButton from "../ui/GameButton";
function DebugWindow() {
  const { startGame } = useGame();

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute top-2/3 left-10 flex h-20 w-sm rounded-sm items-center justify-center bg-amber-50 p-2"
    >
      <GameButton callback={() => startGame()} text={"START GAME"} />;
    </motion.div>
  );
}
export default DebugWindow;
