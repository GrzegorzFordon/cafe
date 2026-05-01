import { useEffect, useState } from "react";
// import { eventEmitter } from "../../../util/eventEmitter";
import FakeGameController from "./fakegame/game.controller.fake";
import useFakeGame from "./hooks/useFakeGame";

function FakeGamePage() {
  const {
    addAdditionEvent,
    processActions,
    actions,
    subscribeToGameEffects,
    unsubscribeToGameEffects,
  } = useFakeGame();

  const [count, setCount] = useState(0);

  const update = async (e) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCount(e.amount);
  };

  useEffect(() => {
    subscribeToGameEffects(update);
    return () => unsubscribeToGameEffects(update);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex h-44 w-md flex-col items-center justify-center gap-4 rounded-sm bg-amber-50">
        <h1 className="text-2xl font-black text-black">{count}</h1>

        <div className="flex gap-2">
          <button
            onClick={addAdditionEvent}
            className="cursor-pointer gap-2 rounded-sm bg-amber-200 px-4 py-2 hover:bg-amber-300 active:bg-amber-400"
          >
            push addition event
          </button>
          <button
            onClick={processActions}
            className="cursor-pointer gap-2 rounded-sm bg-amber-200 px-4 py-2 hover:bg-amber-300 active:bg-amber-400 disabled:cursor-default disabled:bg-amber-100"
            disabled={actions.length == 0}
          >
            process events
          </button>
        </div>
      </div>
      <div className="bg-amber-50">{JSON.stringify(actions)}</div>
    </div>
  );
}
export default FakeGamePage;
