import useGame from "../hooks/useGame";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import GameButton from "../ui/GameButton";
function DebugWindow() {
  const { startGame, processEffects } = useGame();

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute top-2/3 left-10 flex flex-col h-fit w-fit items-center justify-center gap-2 rounded-sm bg-amber-50 p-2"
    >
      <GameButton callback={() => startGame()} text={"START GAME"} />
      <GameButton callback={() => processEffects()} text={"PROCESS EFFECTS"} />
    </motion.div>
  );
}
export default DebugWindow;
