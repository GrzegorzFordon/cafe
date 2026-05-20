import { BURN_TYPES } from "@cafe/engine/config";
import useGameStore from "../stores/useGameStore";

const useValidate = () => {
  const gameController = useGameStore((state) => state.gameController);
  const burnEffects = useGameStore((state) => state.burnEffects);

  const getLegalMoves = (unit) => {
    // burnEffects.filter((val) => val.burnEffects.contains(type));
    const currentSpeedBonusCount = burnEffects?.filter((val) =>
      val.burnEffects?.includes(BURN_TYPES.MOVE),
    ).length;
    return gameController.boardController.getLegalMoves(
      unit,
      currentSpeedBonusCount,
    );
  };

  const getLegalTargets = () => {
    return [];
    // return gameController.boardController.getLegalMoves(unit);
  };

  return { getLegalMoves, getLegalTargets };
};

export default useValidate;
