import useGameStore from "../../../../stores/useGameStore";

const useIntent = () => {
  const intents = useGameStore((state) => state.intents);
  const addIntent = useGameStore((state) => state.addIntent);
  const resetIntents = useGameStore((state) => state.resetIntents);

  /**
   * Intent Actions
   */

  const addPlayCardIntent = (cardID, target) => {
    const action = { type: "card:play", cardID, target };
    addIntent(action);
    console.log("Play Card: ", action);
    return true;
  };

  const addBurnCardIntent = (cardID) => {
    const action = { type: "card:burn", cardID };
    addIntent(action);
    console.log("Burn Card: ", cardID);
  };

  const addMoveUnitIntent = (unitID, target) => {
    const action = { type: "unit:move", unitID, target };
    addIntent(action);
    console.log("Move Unit: ", unitID, target);
  };

  const addUseAbilityIntent = (unitID) => {
    const action = { type: "card:ability", unitID };
    addIntent(action);
  };

  return {
    intents,
    resetIntents,
    addPlayCardIntent,
    addBurnCardIntent,
    addMoveUnitIntent,
    addUseAbilityIntent,
  };
};
export default useIntent;
