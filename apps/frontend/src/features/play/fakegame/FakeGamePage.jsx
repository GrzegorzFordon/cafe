import { useEffect, useState } from "react";
import { eventEmitter } from "../../../util/eventEmitter";
import FakeGameController from "./fakegame/game.controller.fake";
import useFakeGame from "./useFakeGame";

function FakeGamePage() {
  const { addAdditionEvent, processEvents, intents } = useFakeGame();

  const [count, setCount] = useState(0);

  const handleAdditionSideEffectA = async (val) => {
    setCount(val);
  };

  useEffect(() => {
    eventEmitter.on("fake:addition", async (v) => handleAdditionSideEffectA(v));
    return () =>
      eventEmitter.off("fake:addition", async (v) =>
        handleAdditionSideEffectA(v),
      );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex h-44 w-md flex-col items-center justify-center gap-4 rounded-sm bg-amber-50">
        <h1 className="text-2xl font-black text-black">{count}</h1>

        <div className="flex gap-2">
          <button
            onClick={addAdditionEvent}
            className="gap-2 rounded-sm bg-amber-200 px-4 py-2"
          >
            push addition event
          </button>
          <button
            onClick={processEvents}
            className="gap-2 rounded-sm bg-amber-200 px-4 py-2"
          >
            process events
          </button>
        </div>
      </div>
      <div className="bg-amber-50">{JSON.stringify(intents)}</div>
    </div>
  );
}
export default FakeGamePage;
