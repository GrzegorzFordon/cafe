import useGame from "../hooks/useGame";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import GameButton from "../tile/ui/GameButton";
import { useCallback, useEffect, useState } from "react";
import { GAME_PHASES } from "@cafe/engine/config";
import eventBus from "../util/eventBus";
import useSocket from "../../../socket/hooks/useSocket";
import useSocketStore from "../../../../stores/useSocketStore";
import { useHotkeys } from "react-hotkeys-hook";
function DebugWindow() {
  const { startGame, submitActions } = useGame();
  // const { startGame } = useSocket();
  const actionsSubAck = useSocketStore((state) => state.actionsSubAck);

  const [phase, setPhase] = useState("PRE");

  useHotkeys(
    "space",
    () => {
      if (phase === GAME_PHASES.PLAN) submitActions();
    },
    {},
    phase,
  );

  const handleEffectsDEBUG = useCallback((e) => {
    if (e.name != "Game Advanced Effect") return;
    // console.log(e);
    setPhase(e.phase);
  }, []);

  useEffect(() => {
    eventBus.subscribeToGameEffects(handleEffectsDEBUG);
    return () => eventBus.unsubscribeToGameEffects(handleEffectsDEBUG);
  }, [handleEffectsDEBUG]);

  const children =
    phase == GAME_PHASES.PLAN ? (
      <GameButton
        callback={() => submitActions()}
        disabled={actionsSubAck}
        text={actionsSubAck ? "SUBMITTED" : "SUBMIT ACTIONS"}
      />
    ) : null;

  return (
    <motion.div
      // drag
      dragMomentum={false}
      className="absolute top-1/6 right-2 flex h-fit w-38 flex-col items-center justify-center gap-2 rounded-sm bg-amber-50 p-2"
    >
      <h1 className="flex items-center justify-center font-black text-black select-none">
        {phase} Phase
      </h1>
      {children}
    </motion.div>
  );
}
export default DebugWindow;
