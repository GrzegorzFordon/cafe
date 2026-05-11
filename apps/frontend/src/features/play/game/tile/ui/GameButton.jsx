function GameButton({ callback, text }) {
  return (
    <button
      onClick={callback}
      draggable={false}
      key={text}
      className="w-full cursor-pointer rounded-sm bg-amber-200 p-2 font-bold text-black select-none hover:bg-amber-300 active:scale-95 active:bg-amber-400"
    >
      {text}
    </button>
  );
}
export default GameButton;
