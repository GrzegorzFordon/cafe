import Tile from "./Tile";
import useBoard from "../../hooks/useBoard";
import { useCallback, useEffect, useRef, useState } from "react";

const SIZE_A = 60;
const SIZE_BOARD = 600;

function Board() {
  const ref = useRef();
  // const [boardSize, setBoardsize] = useState({ width: 200, height: 100 });
  const { positions } = useBoard(
    { x: SIZE_A, y: SIZE_A * 0.7 },
    // { x: boardSize?.width * 0.5, y: boardSize?.height * 0.5 },
    { x: SIZE_BOARD * 0.5, y: SIZE_BOARD * 0.5 * 0.7 },
  );

  // const handleSizeChange = useCallback(() => {
  //   const { width, height } = ref.current.getBoundingClientRect();
  //   setBoardsize({ width: width, height: height });
  //   console.log("board size:", boardSize);
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", handleSizeChange);
  //   handleSizeChange();
  //   return () => window.removeEventListener("resize", handleSizeChange);
  // }, [handleSizeChange]);

  return (
    <div
      ref={ref}
      style={{ width: SIZE_BOARD, height: SIZE_BOARD * 0.7 }}
      className="absolute top-3/7 left-1/2 flex -translate-1/2 flex-col items-center justify-center rounded-2xl  text-2xl font-black text-black"
    >
      {positions.map((val) => (
        <div
          style={{
            position: "absolute",
            left: val.x - SIZE_A * 0.5,
            top: val.y - SIZE_A * 0.5,
            width: SIZE_A,
            height: SIZE_A,
          }}
          className="flex items-center justify-center"
        >
          <Tile />
        </div>
      ))}
      {/* <h1 className="absolute top-20 left-0">
        {mousedOverHex.q}/{mousedOverHex.r}/{mousedOverHex.r}
      </h1> */}
      {/* <div className="z-20 size-5 rounded-2xl bg-orange-500"></div> */}
    </div>
  );
}
export default Board;
