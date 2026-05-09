import useGameStore from "../stores/useGameStore";
import EventBus from "../util/eventBus.js";
const useGame = () => {
  const gameController = useGameStore((state) => state.gameController);
  const actions = useGameStore((state) => state.actions);
  const resetActions = useGameStore((state) => state.resetActions);

  const startGame = () => {
    EventBus.connect();
    gameController.start();
  };

  const advanceGame = () => {
    gameController.advance();
  };

  const submitActions = () => {
    // sendActions(actions);
    // local version has actions stored already so we send them to the sim immediately for now
    // console.log("[Hook] Submitting");
    gameController.handleActions(actions);
    resetActions();
  };

  return {
    startGame,
    advanceGame,
    submitActions,
  };
};

export default useGame;
