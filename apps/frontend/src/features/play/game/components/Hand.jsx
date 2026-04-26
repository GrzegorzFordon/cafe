import Card from "./Card.jsx";

/**
 * client side Hand component
 * Handles Display of cards in hand
 * (how to remember rearranging hand)
 */

function Hand() {
  const cards = Array(1, 2, 3, 4, 5).map((v) => <Card key={v} />);

  return (
    <div className="z-5 flex size-40 w-fit justify-center gap-2 rounded bg-amber-200 p-2">
      {cards}
    </div>
  );
}
export default Hand;
