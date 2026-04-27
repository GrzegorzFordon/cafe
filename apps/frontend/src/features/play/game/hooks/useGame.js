import { useRef } from "react";
// import useGameStore from "../../../stores/useGameStore";
import useSocket from "../../../socket/hooks/useSocket";

const useGame = () => {
  // const gameManager = useGameStore((state) => state.gameManager);
  // const gameState = useGameStore((state) => state.gameState);

  const sendActions = useSocket();
  const actions = useRef([]);

  


  const tryPlayCard = (cardID, target) => {
    /**
     * played cards can be
     * units (target is a tile/hex)
     * spells (target can be a unit, structure, tile, or null)
     */
    const action = { type: "card:play", cardID, target };
    addAction(action);
    console.log(cardID);
  };

  const tryBurnCard = (cardID) => {
    const action = { type: "card:play", cardID };
    addAction(action);
  };

  const tryMoveUnit = (pawnID, target) => {
    const action = { type: "card:play", pawnID, target };
    addAction(action);
  };

  const tryUseAbility = (pawnID) => {
    const action = { type: "card:play", pawnID };
    addAction(action);
  };

  const addAction = (action) => {
    actions.current.push(action);
  };

  const resetActions = () => {
    actions.current = [];
  };

  const submitActions = () => {
    sendActions(actions);
    resetActions();
  };

  return {
    tryPlayCard,
    tryBurnCard,
    tryMoveUnit,
    tryUseAbility,
    resetActions,
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
