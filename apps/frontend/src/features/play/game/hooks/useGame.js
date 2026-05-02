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
      console.log("Caught Sim Effect", e);
      addEffect(e);
    },
    [addEffect],
  );

  useEffect(() => {
    eventEmitter.on("unit:spawn", handleSideEffect);
    return () => eventEmitter.off("unit:spawn", handleSideEffect);
  }, [handleSideEffect]);

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
    console.log("processing actions");
    while (actions.length > 0) {
      const nextAction = getNextAction();
      if (!nextAction) break;
      //   fakeGameController.handleAction(nextAction);
    }

    //Then process the Side Effects
    await processEffects();
  };

  const processEffects = async () => {
    console.log("processing effects");
    while (effects.length > 0) {
      const nextEffect = getNextEffect();
      if (!nextEffect) break;
      // await notifyObserversOfGameEffects(nextEffect);
      console.log(nextEffect);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // console.log("TIME TO ADVANCE GAME");
    advanceGame();
  };

  return {
    startGame,
    advanceGame,
    submitActions,
  };
};

export default useGame;
