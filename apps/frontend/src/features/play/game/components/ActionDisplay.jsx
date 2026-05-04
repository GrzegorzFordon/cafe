import { useMemo, useState } from "react";
import useAction from "../hooks/useAction";
import GameButton from "../ui/GameButton";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function ActionDisplay() {
  const { resetActions, actions } = useAction();
  const [expand, setExpand] = useState(false);

  const list = useMemo(
    () =>
      actions.map((action) => (
        <p>{JSON.stringify(expand ? action : action.name)}</p>
      )),
    [expand, actions],
  );
  return (
    <motion.div className="absolute top-1/6 left-10 flex size-fit flex-col items-start justify-center gap-2 rounded-sm bg-amber-50 p-2 text-sm text-black">
      <div className="flex gap-2">
        {" "}
        <h1 className="flex items-center justify-center font-black text-black">
          Actions
        </h1>
        <input
          type="checkbox"
          value={expand}
          onChange={() => setExpand(!expand)}
        />
      </div>
      {list}

      <div className="BUTTONS w-full flex justify-center gap-2">
        <GameButton callback={resetActions} text={"RESET"} className="w-full" />
      </div>
    </motion.div>
  );
}
export default ActionDisplay;
