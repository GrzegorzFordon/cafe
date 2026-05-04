import { useMemo, useState } from "react";
import useAction from "../hooks/useAction";
import GameButton from "../ui/GameButton";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useGame from "../hooks/useGame";

function ActionDisplay() {
  const { resetActions, getActionsByID, actions } = useAction();
  const { submitActions } = useGame();
  const [expand, setExpand] = useState(false);
  const [text, setText] = useState("");

  // const filteredActions = getActionsByID(text);
  const filteredActions = actions;
  const list = useMemo(
    () =>
      filteredActions.map((action) => (
        <p>{JSON.stringify(expand ? action : action.name)}</p>
      )),
    [expand, filteredActions],
  );
  return (
    <motion.div className="absolute top-1/7 right-10 flex size-fit flex-col items-center justify-between gap-2 rounded-sm bg-amber-50 p-2 text-sm text-black">
      <h1 className="flex items-center justify-center font-black text-black">
        Actions
      </h1>
      <input
        type="checkbox"
        value={expand}
        onChange={(e) => setExpand(!expand)}
      />
      {list}
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
