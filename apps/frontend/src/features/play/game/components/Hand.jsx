import { useState } from "react";
import Card from "../Card/Card.jsx";
import { Reorder } from "motion/react";
/**
 * client side Hand component
 * Handles Display of cards in hand
 * (how to remember rearranging hand)
 */

function Hand() {
  const [handOrder, setHandOrder] = useState([0, 1, 2, 3, 4]);

  return (
    <Reorder.Group
      as="div"
      className="absolute bottom-5 left-1/2 z-20 flex w-1/2 bg-amber-50 -translate-x-1/2 justify-center gap-1 rounded p-2"
      axis="x"
      values={handOrder}
      onReorder={setHandOrder}
    >
      {/* <img
        src={handSprite}
        draggable={false}
        alt=""
        className="absolute top-1/2 left-1/2 -translate-1/2 scale-x-175"
      /> */}
      {handOrder.map((item) => (
        <Card key={item} cardID={item} orderItem={item} />
      ))}
    </Reorder.Group>
  );
}
export default Hand;
