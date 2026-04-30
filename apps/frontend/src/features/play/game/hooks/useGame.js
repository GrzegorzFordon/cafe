import useGameStore from "../../../../stores/useGameStore";

const useGame = () => {
  const gameManager = useGameStore((state) => state.gameManager);
  const gameState = useGameStore((state) => state.gameState);
  // const sendActions = useSocket();

  const submitActions = () => {
    // sendActions(actions);
    // resetActions();
  };

  return {
    submitActions,
    gameManager, //todo
    gameState, //todo
  };
};

export default useGame;

/**
 * capture active game state here by listening to game:change events?
 * this might also need to capture the sideeffects?

 * where does validation happen?
 * the client does need to ask the engine if what they want to do is legal?
 * illegal options should not be allowed in the first place
 */
