function GameButton({ callback, text, disabled }) {
  return (
    <button
      onClick={callback}
      draggable={false}
      disabled={disabled}
      key={text}
      className="w-full cursor-pointer rounded-sm bg-amber-200 p-2 text-sm font-bold text-black select-none hover:bg-amber-300 active:scale-95 active:bg-amber-400 disabled:scale-100 disabled:cursor-default disabled:bg-amber-200/40"
    >
      {text}
    </button>
  );
}
export default GameButton;
