// eslint-disable-next-line no-unused-vars
import {
  AnimatePresence,
  easeOut,
  motion,
  Reorder,
  scale,
  useMotionValue,
} from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useBoard from "../hooks/useBoard.js";
import useAction from "../hooks/useAction.js";
import PlayAction from "@cafe/engine/action/actions/play.action.js";
import { useMemo, useRef } from "react";
import ReactRough, { Line, Rectangle } from "rough-react-wrapper";
// import rough from "roughjs";

/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */

const MAX_HAND_FAN_ANGLE_DEGREES = 10;

const BURN_TRESHOLD_X_MIN = 350;
const BURN_TRESHOLD_Y_MAX = 150;

function Card({ order, card, index }) {
  const { mousedOverHex, isHexWithinBoard, pixelFromHex, boardPos } =
    useBoard();
  const ref = useRef();
  // const offset = useMotionValue();
  const { addActionObject, getActionsByCard } = useAction();
  const isBurn = useMotionValue(0);
  const curPos = useMotionValue(0);
  const offset = useMotionValue();
  // const mousePos = useMousePos();
  // const [dragStartMouseOffset, setDragStartMouseOffset] = useState({
  //   x: 0,
  //   y: 0,
  // });

  const actions = getActionsByCard(card);
  const isPlayed = useMemo(() => actions.length != 0, [actions.length]);
  const angle = MAX_HAND_FAN_ANGLE_DEGREES * (index - 0.5);
  // const target = useMemo(() => actions[0]?.hex, [actions]);

  // const targetScreenPos = useMemo(
  //   () => pixelFromHex(target ?? ""),
  //   [pixelFromHex, target],
  // );
  const handlePlay = () => {
    if (isHexWithinBoard(mousedOverHex)) {
      const action = new PlayAction(card, mousedOverHex);
      addActionObject(action);
    } else if (isBurn.get()) {
      // addBurnCardAction(cardID)
    }
  };
  const handleDrag = (info) => {
    const yOffset = Math.abs(info.offset.y);
    isBurn.set(yOffset > 200);
    // curPos.set(info.point);
    const rect = ref.current.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width * 0.5);
    const y = Math.round(rect.top + rect.height * 0.5);
    const curCardPos = { x: x, y: y };
    curPos.set(curCardPos);
    const offX = Math.abs(curPos.get().x - boardPos.x);
    const offY = Math.abs(curPos.get().y - boardPos.y);
    offset.set({ x: offX, y: offY });

    const burn =
      offset.get().x > BURN_TRESHOLD_X_MIN &&
      offset.get().y < BURN_TRESHOLD_Y_MAX;
    console.log(burn, "x", offset.x, "y", offset.y);
    isBurn.set(burn);
  };

  return (
    <Reorder.Item
      ref={ref}
      drag={!isPlayed}
      as="div"
      whileDrag={{ scale: 0.3, opacity: 0.7, cursor: "grabbing" }}
      key={card}
      value={order}
      onDrag={(e, info) => handleDrag(info)}
      onDragEnd={handlePlay}
      initial={{ scale: 0, translateY: "5em" }}
      animate={{ scale: 1, translateY: 0 }}
      exit={{
        scale: 0,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      transition={easeOut}
      className="aspect-2.5/3.5 h-full w-full select-none"
    >
      <motion.div
        className="aspect-2.5/3.5 h-full w-full select-none"
        key={card}
        whileHover={
          isPlayed
            ? {}
            : {
                scale: 1.15,
                rotate: `${angle * 0.2}deg`,
                transition: { duration: 0.1 },
              }
        }
        style={{
          rotate: `${angle}deg`,
          filter: isPlayed ? "brightness(0.4)" : "none",
        }}
      >
        <CardVisual key={order} order={order} card={card} />

        <div className="pointer-events-none absolute top-1/2 left-1/2 z-30 size-full scale-200 text-sm font-bold text-black">
          {/* <h1>Order: {order.cardID}</h1>
          <h1>Card: {card.cardID}</h1>
          <h1>Index: {Math.round(index * 100) / 100}</h1> */}
          <h1 className="text-4xl text-red-400">
            {isBurn.get() ? "BURN" : ""}
          </h1>
          {/* <h1>boardPos: {JSON.stringify(boardPos)}</h1>
          <h1>curPos: {JSON.stringify(curPos.get())}</h1>
          <h1>offset: {JSON.stringify(offset.get())}</h1> */}
        </div>

        {/* <div className="absolute top-1/2 left-1/2">
          <ReactRough renderer={"svg"} width={100} height={100}>
            <Line
              x1={0}
              x2={targetScreenPos.x}
              y1={0}
              y2={targetScreenPos.y}
              stroke="red"
              strokeWidth={50}
            />
            <Rectangle
              width={200}
              height={200}
              x={10}
              y={10}
              fill="#6700c9"
              fillStyle={"cross-hatch"}
            />
          </ReactRough>
        </div> */}
      </motion.div>
    </Reorder.Item>
  );
}
export default Card;
