import { BURN_TYPES } from "@cafe/engine/config";
import useGameStore from "../stores/useGameStore";
import useSocketStore from "../../../../stores/useSocketStore";

const useValidate = () => {
  const gameController = useGameStore((state) => state.gameController);
  const burnEffects = useGameStore((state) => state.burnEffects);
  const socketID = useSocketStore((state) => state.socketID);

  const getLegalMoves = (unit) => {
    const currentSpeedBonusCount = burnEffects?.filter((val) =>
      val.burnEffects?.includes(BURN_TYPES.MOVE),
    ).length;
    return gameController.boardController.getLegalMoves(
      unit,
      currentSpeedBonusCount,
    );
  };

  const getLegalTargets = (card) => {
    return gameController.cardController.getLegalTargets(socketID, card) ?? [];
  };

  return { getLegalMoves, getLegalTargets };
};

export default useValidate;
