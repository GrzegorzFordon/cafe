import useGameStore from "../../../../stores/useGameStore";

const useAction = () => {
  const actions = useGameStore((state) => state.actions);
  const addAction = useGameStore((state) => state.addAction);
  const resetActions = useGameStore((state) => state.resetActions);

  /**
   * Action Actions
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

  const getActionsByID = (ID) => {
    return actions.filter((val) => val?.ID?.includes(ID));
  };

  const getActionsByTarget = (target) => {
    // console.log(target, actions);
    return actions.filter((val) => val.target?.isEqual(target));
  };

  return {
    actions,
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
