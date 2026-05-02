function GameButton({ callback, text }) {
  return (
    <button
      onClick={callback}
      draggable={false}
      key={text}
      className="w-full rounded-sm bg-amber-200 p-2 font-bold text-black select-none"
    >
      {text}
    </button>
  );
}
export default GameButton;
