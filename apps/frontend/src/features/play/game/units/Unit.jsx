// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
// import { useEffect, useRef, useState } from "react";
import unitSprite from "../assets/units/character_yellow_front.png";
import unitSpriteA from "../assets/units/character_purple_front.png";
import { useId, useMemo } from "react";
import useBoard from "../hooks/useBoard";
import useAction from "../hooks/useAction";
import { eventEmitter } from "../../../../util/eventEmitter.js";
import MoveAction from "../../../../../../../packages/engine/action/actions/move.action.js";

/**
 * Pawn component
 * TODO Pass sprite as prop
 */

function Unit({ unitID }) {
  // const id = useRef(nanoid());
  const id = useId();
  const { addMoveUnitAction, getActionsByID, addActionObject } = useAction();
  const { mousedOverHex } = useBoard();

  const sprite = useMemo(
    () => (unitID == 0 ? unitSprite : unitSpriteA),
    [unitID],
  );
  // const [yPos, setYPos] = useState(100);
  // const ref = useRef();

  // useEffect(() => {
  //   setYPos(ref.current.getBoundingClientRect().y);
  // }, []);

  const myAction = useMemo(() => getActionsByID(id), [getActionsByID, id]);

  const handleDragStart = () => {
    eventEmitter.emit("unit:dragStart", id, unitID);
  };
  const handleDragEnd = () => {
    eventEmitter.emit("unit:dragEnd", id, unitID, mousedOverHex);

    const isWithinBoard =
      Math.abs(mousedOverHex.q) < 4 &&
      Math.abs(mousedOverHex.r) < 4 &&
      Math.abs(mousedOverHex.s) < 4;
    if (isWithinBoard) addMoveUnitAction(id, unitID, mousedOverHex);
    // if (isWithinBoard) addActionObject(new MoveAction(unitID, mousedOverHex));
  };

  /**
   * instead of setting a "set actioned" flag, have the useaction hook return info about action of specific type AND specific ID
   * then components can simply check if they are on it
   */

  return (
    <div
      // ref={ref}
      className="UNIT absolute -top-7 left-0 size-15 -translate-1/2 select-none"
      // style={{ zIndex: Math.round(yPos) + 5000 }}
    >
      <img draggable="false" className="select-none" src={sprite} />

      <motion.div
        drag={myAction.length == 0}
        dragSnapToOrigin={myAction.length == 0}
        onDragStart={() => handleDragStart()}
        onDragEnd={() => handleDragEnd()}
        className="UNIT_MOVER_GHOST absolute top-1/2 left-1/2 size-full -translate-1/2 rounded-2xl"
        style={{ filter: myAction.length > 0 ? "brightness(0.4)" : "none" }}
      >
        <img
          className="pointer-events-none size-fit opacity-55 select-none"
          draggable="false"
          src={sprite}
        />
        {/* <h1>{id}</h1> */}
        {/* <div className="absolute top-10 left-1/2 size-20 -translate-x-1/2 bg-amber-50">
          {Object.entries(getActionByID(id)).map((element) => {
            <p className="z-20">{JSON.stringify(element)}</p>;
          })}
        </div> */}
        <div className="absolute top-1/2 left-1/2 size-fit -translate-1/2 bg-amber-50 text-sm">
          {/* {JSON.stringify(myAction)} */}
          {/* {myAction.length} */}
        </div>
      </motion.div>
      {/* <svg>
        <line
          x1={0}
          y1={0}
          x2={50}
          y2={10}
          style={{ stroke: "red", strokeWidth: 2 }}
        />
      </svg> */}
    </div>
  );
}
export default Unit;

/**
 * pawn needs to have an offset from bottom value
 * on drag start, get the difference between the mousepos and that offset
 * per default the offset would be zero, so the mouseoffset would be mouse<->bottom of unit
 */

/*
      onDrag={() => {
        const y = ref.current.getBoundingClientRect().y;
        setYPos(y);
        console.log(ref.current.getBoundingClientRect().y);
      }}

      */
