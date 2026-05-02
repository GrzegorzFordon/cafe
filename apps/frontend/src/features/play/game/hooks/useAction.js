import useGameStore from "../../../../stores/useGameStore";

/**
 * Custom hook for selecting actions (sim inputs)
 */

const useAction = () => {
  const actions = useGameStore((state) => state.actions);
  const addAction = useGameStore((state) => state.addAction);
  const resetActions = useGameStore((state) => state.resetActions);

  /**
   * Actions (Replace with actions from Engine!)
   */

  const addPlayCardAction = (ID, cardID, target) => {
    const action = { type: "card:play", ID, cardID, target };
    addAction(action);
    console.log("Play Card: ", action);
    return true;
  };

  const addBurnCardAction = (ID, cardID) => {
    const action = { type: "card:burn", cardID };
    addAction(action);
    console.log("Burn Card: ", cardID);
  };

  const addMoveUnitAction = (ID, unitID, target) => {
    const action = { type: "unit:move", ID, unitID, target };
    addAction(action);
    // console.log("Move Unit: ", unitID, target);
  };

  const addUseAbilityAction = (ID, unitID) => {
    const action = { type: "card:ability", unitID };
    addAction(action);
  };

  /**
   * Getters for views displaying Actions
   */

  const getActionsByID = (ID) => {
    return actions.filter((val) => val?.ID?.includes(ID));
  };

  const getActionsByTarget = (target) => {
    // console.log(target, actions);
    return actions.filter((val) => val.target?.isEqual(target));
  };

  /**
   * TODO - DOES PROCESS ACTIONS GO HERE? AS IN SENT TO SIM? OR ARE ACTIONS USED BY USEGAME HOOK
   */

  return {
    getActionsByID,
    getActionsByTarget,
    resetActions,
    addPlayCardAction,
    addBurnCardAction,
    addMoveUnitAction,
    addUseAbilityAction,
  };
};
export default useAction;
