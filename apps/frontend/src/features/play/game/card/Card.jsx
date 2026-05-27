// eslint-disable-next-line no-unused-vars
import {
  AnimatePresence,
  easeOut,
  motion,
  Reorder,
  useMotionValue,
  useSpring,
} from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useBoard from "../hooks/useBoard.js";
import useAction from "../hooks/useAction.js";
import PlayAction from "@cafe/engine/action/actions/play.action.js";
import BurnAction from "@cafe/engine/action/actions/burn.action.js";
import { useMemo, useRef } from "react";
import ReactRough, { Line, Rectangle } from "rough-react-wrapper";
import useGameStore from "../stores/useGameStore.js";
import { BURN_TYPES, SPELL_TARGET_TYPES } from "@cafe/engine/config.js";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import CardBurnEffectsView from "./CardBurnEffectsView.jsx";
import useUnits from "../hooks/useUnits.js";
import CardHUD from "./CardHUD.jsx";
import useValidate from "../hooks/useValidate.js";

const MAX_HAND_FAN_ANGLE_DEGREES = 15;
const BURN_TRESHOLD_X_MIN = 350;
const BURN_TRESHOLD_Y_MAX = 150;

function Card({ order, card, index }) {
  const ref = useRef();
  const addBurnEffect = useGameStore((state) => state.addBurnEffect);
  const { mousedOverHex, isMousedOverHexWithinBoard, boardPos } = useBoard();
  const { addActionObject, hasActionsOfType, isCardBurned } = useAction();
  const { firstMousedOverUnit } = useUnits();
  const { getLegalTargets } = useValidate();

  const isPlayed = useMemo(
    () => hasActionsOfType(card.id, "PLAY"),
    [card.id, hasActionsOfType],
  );
  const isBurned = isCardBurned(card);

  const angle = MAX_HAND_FAN_ANGLE_DEGREES * (index - 0.5);

  const isBurning = useMotionValue(0);
  const dragOffsetMotionValueX = useMotionValue(0);
  const dragOffsetMotionValueY = useMotionValue(0);
  const dragOffsetSpringValueX = useSpring(dragOffsetMotionValueX, {
    damping: 100,
    mass: 5,
  });
  const dragOffsetSpringValueY = useSpring(dragOffsetMotionValueY, {
    damping: 100,
    mass: 5,
  });

  const handlePlay = () => {
    eventEmitter.emit("card:drag:end", card);

    dragOffsetSpringValueX.jump(0);
    dragOffsetSpringValueY.jump(0);
    ref.current.style.left = "0px";
    ref.current.style.top = "0px";

    if (isMousedOverHexWithinBoard) {
      const target =
        card.targetType === SPELL_TARGET_TYPES.HEX
          ? mousedOverHex
          : firstMousedOverUnit;
      console.log(
        target ?? "no target",
        getLegalTargets(card),
        card.targetType,
      );
      if (
        !getLegalTargets(card).some((val) => {
          if (card.targetType === SPELL_TARGET_TYPES.UNIT)
            return val.id === target?.id;
          else return val.isEqual(target);
        })
      )
        return;
      const playAction = new PlayAction(card, target);
      addActionObject(playAction);
    } else if (isBurning.get() == true) {
      addBurnEffect(card);
    }
    isBurning.set(false);
  };

  const handleDragStart = () => {
    eventEmitter.emit("card:drag:start", card);
  };

  const handleDrag = (e, info) => {
    const rect = ref.current.getBoundingClientRect();
    const posX = Math.round(rect.left + rect.width * 0.5);
    const posY = Math.round(rect.top + rect.height * 0.5);

    //offset to mouse pos (for lerp)
    const mousePosOffsetX = Math.round(posX - info.point.x);
    const mousePosOffsetY = Math.round(posY - info.point.y);
    dragOffsetMotionValueX.set(mousePosOffsetX);
    dragOffsetMotionValueY.set(mousePosOffsetY);
    ref.current.style.left = -dragOffsetSpringValueX.get() * 5 + "px";
    ref.current.style.top = -dragOffsetSpringValueY.get() * 5 + "px";

    //offset to board
    const offX = Math.abs(posX - boardPos.x);
    const offY = Math.abs(posY - boardPos.y);
    const burn = offX > BURN_TRESHOLD_X_MIN && offY < BURN_TRESHOLD_Y_MAX;
    isBurning.set(burn);
  };

  return (
    <Reorder.Item
      ref={ref}
      drag={!isPlayed && !isBurned}
      as="div"
      whileDrag={{
        scale: 0.3,
        opacity: 0.7,
        cursor: "grabbing",
        pointerEvents: "none",
      }}
      key={card}
      layout
      value={order}
      dragSnapToOrigin={!isBurned && !isBurned}
      onDragStart={() => handleDragStart()}
      onDrag={(e, info) => handleDrag(e, info)}
      onDragEnd={handlePlay}
      initial={{ scale: 0, translateY: "5em" }}
      animate={{ scale: 1, translateY: 0 }}
      exit={{
        scale: 0,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      transition={easeOut}
      className="relative aspect-2.5/3.5 size-full select-none"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 aspect-2.5/3.5 size-full -translate-1/2 select-none active:cursor-grabbing"
        key={card}
        whileHover={
          isPlayed || isBurned
            ? {}
            : {
                scale: 1.15,
                rotateZ: `${Math.round(angle * 0.2)}deg`,
                transition: { duration: 0.2, ease: easeOut },
                translateY: `-10px`,
              }
        }
        style={{
          filter: !isBurning.get() && isPlayed ? "brightness(0.4)" : "none",
          rotateZ: `${Math.round(angle)}deg`,
        }}
      >
        <CardVisual key={order} order={order} card={card} />
        <CardHUD card={card} isBurning={isBurned || isBurning.get()} />
        <CardBurnEffectsView data={card.burnEffects} />
      </motion.div>
    </Reorder.Item>
  );
}
export default Card;
