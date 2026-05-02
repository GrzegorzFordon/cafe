import { useState } from "react";
import useAction from "../hooks/useAction";
import GameButton from "../ui/GameButton";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useGame from "../hooks/useGame";

function ActionDisplay() {
  const { resetActions, getActionsByID } = useAction();
  const { submitActions } = useGame();

  const [text, setText] = useState("");

  const filteredActions = getActionsByID(text);

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute top-1/3 left-10 flex size-fit w-md flex-col items-center justify-between gap-2 rounded-sm bg-amber-50 p-2 text-sm text-black"
    >
      ActionDisplay (Commands)
      {filteredActions.map((action) => (
        <p>{JSON.stringify(action)}</p>
      ))}
      <input
        type="text"
        className="gap-2 rounded-sm bg-amber-200"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="BUTTONS flex justify-center gap-2">
        <GameButton callback={resetActions} text={"RESET"} />
        <GameButton callback={submitActions} text={"SUBMIT"} />
      </div>
    </motion.div>
  );
}
export default ActionDisplay;
