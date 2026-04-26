import Card from "../Card/Card.jsx";

/**
 * client side Hand component
 * Handles Display of cards in hand
 * (how to remember rearranging hand)
 */

function Hand() {
  const cards = Array(1, 2, 3, 4, 5).map((v) => <Card key={v} />);

  return (
    <div className="absolute bottom-5 left-1/2 z-5 flex size-32 w-fit -translate-x-1/2 justify-center gap-1 rounded bg-amber-50 p-1">
      {cards}
    </div>
  );
}
export default Hand;
