import useGameStore from "../../../../stores/useGameStore";

const useIntent = () => {
  const intents = useGameStore((state) => state.intents);
  const addIntent = useGameStore((state) => state.addIntent);
  const resetIntents = useGameStore((state) => state.resetIntents);

  /**
   * Intent Actions
   */

  const addPlayCardIntent = (ID, cardID, target) => {
    const action = { type: "card:play", ID, cardID, target };
    addIntent(action);
    console.log("Play Card: ", action);
    return true;
  };

  const addBurnCardIntent = (ID, cardID) => {
    const action = { type: "card:burn", cardID };
    addIntent(action);
    console.log("Burn Card: ", cardID);
  };

  const addMoveUnitIntent = (ID, unitID, target) => {
    const action = { type: "unit:move", ID, unitID, target };
    addIntent(action);
    // console.log("Move Unit: ", unitID, target);
  };

  const addUseAbilityIntent = (ID, unitID) => {
    const action = { type: "card:ability", unitID };
    addIntent(action);
  };

  const getIntentsByID = (ID) => {
    return intents.filter((val) => val?.ID?.includes(ID));
  };

  const getIntentsByTarget = (target) => {
    // console.log(target, intents);
    return intents.filter((val) => val.target?.isEqual(target));
  };

  return {
    intents,
    getIntentsByID,
    getIntentsByTarget,
    resetIntents,
    addPlayCardIntent,
    addBurnCardIntent,
    addMoveUnitIntent,
    addUseAbilityIntent,
  };
};
export default useIntent;
