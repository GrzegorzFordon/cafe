function UnitHUD({ atk, speed, hp }) {
  return (
    <div draggable={false} className="pointer-events-none select-none">
      <p className="absolute right-0 -bottom-2 aspect-square size-5 text-center text-green-800 text-shadow-black/60 text-shadow-sm">
        {hp ?? 7}
      </p>
      <p className="absolute right-2 bottom-0 aspect-square size-5 text-center text-red-800 text-shadow-black/60 text-shadow-sm">
        {atk ?? 0}
      </p>
      <p className="absolute top-0 left-0 aspect-square size-5 -translate-y-1/2 text-center text-orange-400 text-shadow-black/60 text-shadow-sm">
        {speed ?? 0}
      </p>
    </div>
  );
}
export default UnitHUD;
