import useGameStore from "../stores/useGameStore";

/**
 * Custom hook for selecting actions (sim inputs)
 */

const useAction = () => {
  const actions = useGameStore((state) => state.actions);
  const addAction = useGameStore((state) => state.addAction);
  const resetActions = useGameStore((state) => state.resetActions);
  const playerID = useGameStore((state) => state.playerID);

  const addActionObject = (action) => {
    action.playerID = playerID;
    addAction(action);
  };

  const getActionsByID = (id) => {
    return actions.filter((val) => val.id.includes(id));
  };
  const getActionsByTarget = (target) => {
    return actions.filter((val) => val.target?.isEqual(target));
  };
  const getActionsByHex = (hex) => {
    return actions.filter((val) => val.hex?.isEqual(hex));
  };

  const getActionsByCard = (card) => {
    return actions.filter((val) => val.card?.id == card.id);
  };
  const getActionsByUnit = (unit) => {
    return actions.filter((val) => val.unit?.id == unit.id);
  };

  const hasActionsOfType = (id, type) => {
    return actions.some((val) => val.card?.id == id && val.name == type);
  };




  return {
    actions,
    getActionsByID,
    getActionsByTarget,
    getActionsByHex,
    getActionsByCard,
    getActionsByUnit,
    resetActions,
    addActionObject,
    hasActionsOfType,
  };
};
export default useAction;

// const addPlayCardAction = (ID, cardID, target) => {
//   const action = { type: "card:play", ID, cardID, target };
//   addAction(action);
//   console.log("Play Card: ", action);
//   return true;
// };

// const addBurnCardAction = (ID, cardID) => {
//   const action = { type: "card:burn", cardID };
//   addAction(action);
//   console.log("Burn Card: ", cardID);
// };

// const addMoveUnitAction = (ID, unitID, target) => {
//   const action = { type: "unit:move", ID, unitID, target };
//   addAction(action);
//   // console.log("Move Unit: ", unitID, target);
// };

// const addUseAbilityAction = (ID, unitID) => {
//   const action = { type: "card:ability", unitID };
//   addAction(action);
// };
