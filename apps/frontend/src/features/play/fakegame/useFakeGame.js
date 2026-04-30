import useFakeGameStore from "./useFakeGameStore";
import FakeGameModel from "./fakegame/game.model.fake";
import FakeAction from "./fakegame/action.fake";

const useFakeGame = () => {
  const fakeGameController = useFakeGameStore(
    (state) => state.fakeGameController,
  );

  const fakeGameModel = useFakeGameStore((state) => state.fakeGameModel);
  const setGameModel = useFakeGameStore((state) => state.setGameModel);
  const addIntent = useFakeGameStore((state) => state.addIntent);
  const intents = useFakeGameStore((state) => state.intents);
  // const intents = useFakeGameStore((state) => state.addIntent);

  const addToState = (amount) => {
    console.log("adding ",amount)
    const res = fakeGameController.addToModel(fakeGameModel,amount);
    setGameModel(res);
  };

  const addAdditionEvent = () => {
    const newaction = new FakeAction(Math.round(Math.random() * 100) / 1);
    addIntent(newaction);
  };

  const processEvents = async () => {
    // const nextAction = TODO get next action from store
    while (intents.length > 0) {
      const nextIntent = intents?.shift();
      console.log(nextIntent.amount);
      addToState(nextIntent.amount);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  };

  const count = fakeGameModel?.count;

  return { addToState, count, addAdditionEvent, processEvents, intents };
};

export default useFakeGame;
