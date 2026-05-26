import { BURN_TYPES, SPELL_TARGET_TYPES } from "@cafe/engine/config";
import useGameStore from "../stores/useGameStore";
import { useState } from "react";
import useSocketStore from "../../../../stores/useSocketStore";

/**
 * Custom hook for selecting actions (sim inputs)
 */

const useAction = () => {
  const actions = useGameStore((state) => state.actions);
  const addAction = useGameStore((state) => state.addAction);
  const resetActions = useGameStore((state) => state.resetActions);
  // const playerID = useGameStore((state) => state.playerID);
  const socketID = useSocketStore((state) => state.socketID);

  const burnEffects = useGameStore((state) => state.burnEffects);
  // const addBurnEffect = useGameStore((state) => state.addBurnEffect);
  const resetBurnEffects = useGameStore((state) => state.resetBurnEffects);
  const usedBurnEffects = useGameStore((state) => state.usedBurnEffects);
  const setUsedBurnEffects = useGameStore((state) => state.setUsedBurnEffects);

  const addActionObject = (action) => {
    action.bonuses = burnEffects;
    setUsedBurnEffects([...usedBurnEffects, ...burnEffects]);
    resetBurnEffects();
    action.playerID = socketID;
    addAction(action);
  };

  const getActionsByID = (id) => {
    return actions.filter((val) => val.id.includes(id));
  };
  const getActionsByTarget = (target) => {
    return actions.filter((val) => val.target?.isEqual(target));
  };
  const getActionsByHex = (hex) => {
    return actions.filter(
      (val) =>
        (val.targetType === SPELL_TARGET_TYPES.HEX || val.name === "MOVE") &&
        val.target?.isEqual(hex),
    );
  };

  const getActionsByCard = (card) => {
    return actions.filter((val) => val.card?.id == card.id);
  };
  const getActionsByUnit = (unit) => {
    return actions.filter((val) => val.unit?.id == unit.id);
  };

  const hasActionsOfType = (id, type) => {
    return actions.some((val) => val.card?.id === id && val.name === type);
  };

  const isCardBurned = (card) => {
    const activelyBurned = burnEffects.some((val) => val.id == card.id);
    const burnedThisTurn = usedBurnEffects.some((val) => val.id == card.id);
    // console.log(card.cardID, activelyBurned, burnedThisTurn);
    return activelyBurned || burnedThisTurn;
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
    isCardBurned,
    // getBurnEffectsOfType,
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
