import { useRef } from "react";
// import useGameStore from "../../../stores/useGameStore";
import useSocket from "../../../socket/hooks/useSocket";

const useGame = () => {
  // const gameManager = useGameStore((state) => state.gameManager);
  // const gameState = useGameStore((state) => state.gameState);

  const sendActions = useSocket();

  const actions = useRef([]);

  const addAction = (action) => {
    //add action to local state
    actions.current.push(action);
  };

  const resetActions = () => {
    actions.current = [];
  };

  const submitActions = () => {
    sendActions(actions);
    resetActions();
  };

  return { addAction, resetActions, submitActions };
};

export default useGame;

/**
 * capture active game state here by listening to game:change events?
 * this might also need to capture the sideeffects?
 */

/**
 * action types:
 * move (who, where)
 * play card (what card, where)
 * burn card (which card)
 * use ability (who, target)
 */

/**
 * where does validation happen?
 * the client does need to ask the engine if what they want to do is legal?
 * illegal options should not be allowed in the first place
 */
