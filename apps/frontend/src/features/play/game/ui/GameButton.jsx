function GameButton({ callback, text }) {
  return (
    <button
      onClick={callback}
      className="cursor-pointer rounded-sm bg-amber-200 p-2 font-bold text-black hover:bg-amber-300 active:scale-95 active:bg-amber-500 disabled:opacity-20"
    >
      {text}
    </button>
  );
}
export default GameButton;
