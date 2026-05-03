import useGameStore from "../stores/useGameStore";
import EventBus from "../util/eventBus.js";
const useGame = () => {
  const gameController = useGameStore((state) => state.gameController);
  const getNextAction = useGameStore((state) => state.getNextAction);
  const actions = useGameStore((state) => state.actions);

  const processActions = async () => {
    console.log("Hook is processing Actions");
    while (actions.length > 0) {
      const nextAction = getNextAction();
      if (!nextAction) break;
      //   fakeGameController.handleAction(nextAction);
    }
  };

  const startGame = () => {
    EventBus.connect();
    gameController.start();
  };

  const advanceGame = () => {
    console.log("Hook is advancing game");
    gameController.advance();
  };

  const submitActions = () => {
    // sendActions(actions);
    // resetActions();
    //local version has actions stored already so we send them to the sim immediately for now
    console.log("Hook is submitting Actions");
    processActions();
  };

  return {
    startGame,
    advanceGame,
    submitActions,
  };
};

export default useGame;
