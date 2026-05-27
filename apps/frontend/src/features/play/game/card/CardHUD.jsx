function CardHUD({ card, isBurning }) {
  return (
    <div draggable={false}>
      <div className="pointer-events-none absolute -top-2 left-0 z-30 flex aspect-square size-4 scale-200 items-center justify-center rounded-full p-2 text-center text-sm font-black text-orange-500 text-shadow-2xs text-shadow-black/70">
        {card.speed && card.speed !== 0 ? card.speed : ""}
      </div>
      <span className="text-md absolute top-1 left-1/2 flex w-fit -translate-1/2 items-center justify-center overflow-visible overflow-x-visible rounded-sm bg-amber-50 p-1 text-sm font-black whitespace-nowrap text-black">
        {card.name}
      </span>

      <div
        style={{
          backgroundColor: isBurning ? "red" : "transparent",
        }}
        className="absolute top-1/2 left-1/2 size-full -translate-1/2 opacity-85 mix-blend-multiply"
      />
      <span className="absolute bottom-1 left-1/2 flex w-9/10 origin-bottom -translate-1/2 justify-center rounded-sm bg-amber-50/90 p-1 text-center">
        {card.cardText}
      </span>
    </div>
  );
}
export default CardHUD;
