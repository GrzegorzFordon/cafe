import useGameStore from "../stores/useGameStore";

const useValidate = () => {
  const gameController = useGameStore((state) => state.gameController);

  const getLegalMoves = (unit) => {
    return gameController.boardController.getLegalMoves(unit);
  };

  const getLegalTargets = () => {
    // return gameController.boardController.getLegalMoves(unit);
  };

  return { getLegalMoves, getLegalTargets };
};

export default useValidate;
