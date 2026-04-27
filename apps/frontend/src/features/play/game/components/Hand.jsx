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
      className="absolute bottom-5 left-1/2 z-5 flex -translate-x-1/2 justify-center gap-1 rounded p-1"
      axis="x"
      values={handOrder}
      onReorder={setHandOrder}
    >
      {handOrder.map((item) => (
        <Card key={item} cardID={item} orderItem={item} />
      ))}
    </Reorder.Group>
  );
}
export default Hand;
