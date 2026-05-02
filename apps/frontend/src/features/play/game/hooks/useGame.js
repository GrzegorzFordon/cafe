import useGameStore from "../../../../stores/useGameStore";
import { useCallback, useEffect } from "react";
import { eventEmitter } from "../../../../util/eventEmitter";
const useGame = () => {
  const gameController = useGameStore((state) => state.gameController);
  const getNextAction = useGameStore((state) => state.getNextAction);
  const actions = useGameStore((state) => state.actions);
  const effects = useGameStore((state) => state.effects);
  const addEffect = useGameStore((state) => state.addEffect);
  const getNextEffect = useGameStore((state) => state.getNextEffect);
  // const sendActions = useSocket();

  const handleSideEffect = useCallback(
    (e) => {
      // console.log("Caught Sim Effect", e);
      addEffect(e);
    },
    [addEffect],
  );

  const handleGameStartedSideEffect = useCallback(() => {
    // processEffects();
    // console.log("Caught Game Starting");
  }, []);

  useEffect(() => {
    eventEmitter.on("game:start", handleGameStartedSideEffect);
    eventEmitter.on("sim:effect", handleSideEffect);
    return () => {
      eventEmitter.off("game:start", handleGameStartedSideEffect);
      eventEmitter.off("sim:effect", handleSideEffect);
    };
  }, [handleGameStartedSideEffect, handleSideEffect]);

  const startGame = () => {
    gameController.start();
  };

  const advanceGame = () => {
    gameController.advance();
  };

  const submitActions = () => {
    // sendActions(actions);
    // resetActions();
    //local version has actions stored already so we send them to the sim immediately for now
    console.log("submitting events");
    processActions();
  };

  const processActions = async () => {
    console.log("Processing Actions");
    while (actions.length > 0) {
      const nextAction = getNextAction();
      if (!nextAction) break;
      //   fakeGameController.handleAction(nextAction);
    }
    //Then process the Side Effects
    await processEffects();
  };

  const processEffects = async () => {
    console.log("Processing Effects");
    while (effects.length > 0) {
      const nextEffect = getNextEffect();
      if (!nextEffect) break;
      // await notifyObserversOfGameEffects(nextEffect);
      console.log("Next Effect", nextEffect);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    // console.log("TIME TO ADVANCE GAME");
    advanceGame();
  };

  return {
    startGame,
    advanceGame,
    submitActions,
    processEffects,
  };
};

export default useGame;
