import useFakeGameStore from "./useFakeGameStore";
import FakeGameModel from "./fakegame/game.model.fake";
import FakeAction from "./fakegame/action.fake";

const useFakeGame = () => {
  const fakeGameController = useFakeGameStore(
    (state) => state.fakeGameController,
  );

  //handle for the add intent?
  const addToState = async (amount) => {
    fakeGameController.addToModel(amount);
    await new Promise((resolve) => setTimeout(resolve, 300));
  };


  /**
   * INTENTS (the actions sent to the sim)
   */

  const addIntent = useFakeGameStore((state) => state.addIntent);
  const intents = useFakeGameStore((state) => state.intents);
  const getNextIntent = useFakeGameStore((state) => state.getNextIntent);

  //push event
  const addAdditionEvent = () => {
    const newaction = new FakeAction(Math.round(Math.random() * 100) / 1);
    addIntent(newaction);
  };

  //process events
  const processEvents = async () => {
    while (intents.length > 0) {
      const nextIntent = getNextIntent();
      if (!nextIntent) return;
      await addToState(nextIntent.amount);
    }
  };

  return { addToState, addAdditionEvent, processEvents, intents };
};

export default useFakeGame;
