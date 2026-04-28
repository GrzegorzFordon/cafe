function UnitHUD() {
  return (
    <div className="">
      <div className="absolute top-1/10 z-10 flex h-fit w-8/10 justify-center gap-px">
        <div className="rounded-1 top-0 h-3 w-full border border-gray-800 bg-green-400 opacity-60"></div>
        <div className="rounded-1 top-0 h-3 w-full border border-gray-800 bg-green-400 opacity-60"></div>
      </div>

      <div className="absolute bottom-0 z-10 flex w-full justify-evenly text-2xl font-black text-black text-shadow-sm">
        <p className="text-red-400">1</p>
        <p className="z-50 text-green-400">1</p>
      </div>

      <div className="absolute bottom-1/50 left-1/2 z-20 size-2 -translate-1/2 rounded-full bg-amber-500"></div>
    </div>
  );
}
export default UnitHUD;
