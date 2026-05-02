function GameButton({ callback, text }) {
  return (
    <button
      onClick={callback}
      className=" rounded-sm bg-amber-200 p-2 font-bold text-black"
    >
      {text}
    </button>
  );
}
export default GameButton;
