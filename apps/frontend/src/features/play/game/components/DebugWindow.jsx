import useGame from "../hooks/useGame";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import GameButton from "../ui/GameButton";
import { useEffect, useState } from "react";
import { GAME_PHASES } from "@cafe/engine/config";
import eventBus from "../util/eventBus";
function DebugWindow() {
  const { startGame, submitActions, advanceGame } = useGame();

  const [phase, setPhase] = useState("PRE");

  const handleEvent = (e) => {
    if (e.name != "Game Advanced Effect") return;
    // console.log(e);
    setPhase(e.phase);
  };
  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEvent);
    return () => eventBus.unsubscribeToGameEffects(handleEvent);
  });

  const children =
    phase == "PRE" ? (
      <GameButton callback={() => startGame()} text={"START GAME"} />
    ) : phase == GAME_PHASES.PLAN ? (
      <GameButton callback={() => submitActions()} text={"SUBMIT ACTIONS"} />
    ) : null;

  return (
    <motion.div
      // drag
      dragMomentum={false}
      className="absolute top-1/6 right-10 flex h-fit w-44 flex-col items-center justify-center gap-2 rounded-sm bg-amber-50 p-2"
    >
      <h1 className="flex items-center justify-center font-black text-black select-none">
        {phase} Phase
      </h1>
      {children}
    </motion.div>
  );
}
export default DebugWindow;
