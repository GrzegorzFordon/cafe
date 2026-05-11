function FinishGameButton({ callback }) {
  return (
    <button
      onClick={callback}
      className="absolute right-2 bottom-2 size-fit cursor-pointer rounded bg-amber-50 px-4 py-2 font-bold text-black select-none"
    >
      FINISH GAME
    </button>
  );
}
export default FinishGameButton;
