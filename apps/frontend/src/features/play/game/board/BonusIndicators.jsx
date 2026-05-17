function BonusIndicators({ data }) {
  return (
    <div className="pointer-events-none flex size-fit flex-col gap-2">
      <div
        style={{ opacity: data.power ? 1.0 : 0.2 }}
        className="size-6 rounded-full bg-red-600 shadow shadow-black/40"
      ></div>
      <div
        style={{ opacity: data.speed ? 1.0 : 0.2 }}
        className="size-6 rounded-full bg-yellow-300 shadow shadow-black/40"
      ></div>
      <div
        style={{ opacity: data.move ? 1.0 : 0.2 }}
        className="size-6 rounded-full bg-green-600 shadow shadow-black/40"
      ></div>
    </div>
  );
}
export default BonusIndicators;

// {
//   card.burnEffects.includes(BURN_TYPES.MOVE) && (
//     <div className="size-4 rounded-full bg-green-600 shadow shadow-black/40"></div>
//   );
// }
