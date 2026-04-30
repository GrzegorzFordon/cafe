import FakeGameController from "./fakegame/game.controller.fake";
import useFakeGame from "./useFakeGame";

function FakeGamePage() {
  const { addToState, count } = useFakeGame();

  return (
    <div className="flex h-44 w-md flex-col items-center justify-center gap-4 rounded-sm bg-amber-50">
      <h1 className="text-2xl font-black text-black">{count}</h1>

      <button
        onClick={addToState}
        className="gap-2 rounded-sm bg-amber-200 px-4 py-2"
      >
        add
      </button>
    </div>
  );
}
export default FakeGamePage;
