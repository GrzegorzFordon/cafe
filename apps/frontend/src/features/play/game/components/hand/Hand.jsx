import Card from "../card/Card.jsx";

function Hand() {
  const cards = Array(1, 2, 3, 4, 5).map((v) => <Card key={v} />);

  return (
    <div className="flex size-50 p-2 w-fit gap-2 justify-center rounded bg-amber-200 z-5">
      {cards}
    </div>
  );
}
export default Hand;
