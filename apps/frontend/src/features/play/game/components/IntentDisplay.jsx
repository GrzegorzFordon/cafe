import { useCallback, useState } from "react";
import useGameStore from "../../../../stores/useGameStore";
import useIntent from "../hooks/useIntent";
import GameButton from "../ui/GameButton";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function IntentDisplay() {
  //   const { resetActions, submitActions } = useGame();
  const { resetIntents, intents, getIntentsByID } = useIntent();

  const [text, setText] = useState("");

  const filteredIntents = getIntentsByID(text);

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute top-1/3 left-0 flex size-fit w-md flex-col items-center justify-between gap-2 rounded-sm bg-amber-50 p-2 text-sm text-black"
    >
      IntentDisplay (Commands)
      {filteredIntents.map((intent) => (
        <p>{JSON.stringify(intent)}</p>
      ))}
      <input
        type="text"
        className="bg-amber-200 rounded-sm gap-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="BUTTONS flex justify-center gap-2">
        <GameButton callback={resetIntents} text={"RESET"} />
        <GameButton callback={resetIntents} text={"SUBMIT"} />
      </div>
    </motion.div>
  );
}
export default IntentDisplay;
