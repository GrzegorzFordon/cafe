import useFakeGameStore from "./useFakeGameStore";
import FakeGameModel from "./fakegame/game.model.fake";

const useFakeGame = () => {
  const fakeGameController = useFakeGameStore(
    (state) => state.fakeGameController,
  );

  const fakeGameModel = useFakeGameStore((state) => state.fakeGameModel);
  const setGameModel = useFakeGameStore((state) => state.setGameModel);

  const addToState = () => {
    const res = fakeGameController.addToModel(fakeGameModel);
    setGameModel(res);
  };

  const count = fakeGameModel?.count;

  return { addToState, count, fakeGameController };
};

export default useFakeGame;
