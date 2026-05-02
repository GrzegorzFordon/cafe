import useGameStore from "../stores/useGameStore";
import EventBus from "../util/eventBus.js";
const useGame = () => {
  const gameController = useGameStore((state) => state.gameController);
  const getNextAction = useGameStore((state) => state.getNextAction);
  const actions = useGameStore((state) => state.actions);
  // const effects = useGameStore((state) => state.effects);
  // const eventBus = useGameStore((state) => state.eventBus);
  // const getNextEffect = useGameStore((state) => state.getNextEffect);
  // const setEventBus = useGameStore((state) => state.setEventBus);
  // const sendActions = useSocket();

  // const processEffects = async () => {
  //   console.log("Processing Effects");
  //   while (effects.length > 0) {
  //     const nextEffect = getNextEffect();
  //     if (!nextEffect) break;
  //     // await notifyObserversOfGameEffects(nextEffect);
  //     console.log("Next Effect", nextEffect);
  //     await new Promise((resolve) => setTimeout(resolve, 300));
  //   }
  //   // advanceGame();
  //   console.log("TIME TO ADVANCE GAME");
  // };

  const processActions = async () => {
    console.log("Processing Actions");
    while (actions.length > 0) {
      const nextAction = getNextAction();
      if (!nextAction) break;
      //   fakeGameController.handleAction(nextAction);
    }
    //Then process the Side Effects
    // await processEffects();
  };

  const startGame = () => {
    // eventBus.getInstance(processEffects);
    // new eventBus(processActions);
    // setEventBus({ gameStartCallback: processActions });
    console.log(EventBus);
    EventBus.connect();
    // EventBusFN.connect();
    gameController.start();
  };

  const advanceGame = () => {
    gameController.advance();
  };

  const submitActions = () => {
    // sendActions(actions);
    // resetActions();
    //local version has actions stored already so we send them to the sim immediately for now
    console.log("Submitting Actions");
    processActions();
  };

  return {
    startGame,
    advanceGame,
    submitActions,
    // processEffects,
  };
};

export default useGame;
