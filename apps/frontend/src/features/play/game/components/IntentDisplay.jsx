import useGameStore from "../../../../stores/useGameStore";
import useIntent from "../hooks/useIntent";
import GameButton from "../ui/GameButton";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function IntentDisplay() {
  const intents = useGameStore((state) => state.intents);

  //   const { resetActions, submitActions } = useGame();
  const { resetIntents } = useIntent();

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute top-1/3 left-0 flex size-fit w-sm flex-col items-center justify-center gap-1 rounded-sm bg-amber-50 p-2 text-sm text-black"
    >
      IntentDisplay
      {intents.map((intent) => (
        <p>{JSON.stringify(intent)}</p>
      ))}
      <div className="BUTTONS flex justify-center gap-2">
        <GameButton callback={resetIntents} text={"RESET"} />
        <GameButton callback={resetIntents} text={"SUBMIT"} />
      </div>
    </motion.div>
  );
}
export default IntentDisplay;
