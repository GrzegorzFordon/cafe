// import useGameStore from "../../../../stores/useGameStore";

const useGame = () => {
  // const gameManager = useGameStore((state) => state.gameManager);
  // const gameState = useGameStore((state) => state.gameState);
  // const sendActions = useSocket();

  // const addIntent = useGameStore((state) => state.addIntent);
  // const resetIntents = useGameStore((state) => state.resetIntents);

  // const tryPlayCard = (cardID, target) => {
  //   const action = { type: "card:play", cardID, target };
  //   addAction(action);
  //   console.log("Play Card: ", action);
  //   return true;
  // };

  // /**
  //  * Intent Actions
  //  */
  // const tryBurnCard = (cardID) => {
  //   const action = { type: "card:burn", cardID };
  //   addAction(action);
  //   console.log("Burn Card: ", cardID);
  // };

  // const tryMoveUnit = (unitID, target) => {
  //   const action = { type: "unit:move", unitID, target };
  //   addAction(action);
  //   console.log("Move Unit: ", unitID, target);
  // };

  // const tryUseAbility = (unitID) => {
  //   const action = { type: "card:ability", unitID };
  //   addAction(action);
  // };

  // const addAction = (action) => {
  //   addIntent(action);
  // };

  // const resetActions = () => {
  //   resetIntents();
  // };

  const submitActions = () => {
    // sendActions(actions);
    // resetActions();
  };

  return {
    // tryPlayCard,
    // tryBurnCard,
    // tryMoveUnit,
    // tryUseAbility,
    // resetActions,
    submitActions,
  };
};

export default useGame;

/**
 * capture active game state here by listening to game:change events?
 * this might also need to capture the sideeffects?
 */

/**
 * where does validation happen?
 * the client does need to ask the engine if what they want to do is legal?
 * illegal options should not be allowed in the first place
 */
