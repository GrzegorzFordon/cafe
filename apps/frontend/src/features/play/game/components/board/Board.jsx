import { useMemo } from "react";
import Orientation from "../../../../../../../../packages/shared/util/orientation";
import Point from "../../../../../../../../packages/shared/util/point";
// import board from "../../assets/board.png";
import Layout from "./layout";
import Tile from "./Tile";
import { Hex } from "../../../../../../../../packages/shared/util/hex";

function Board() {
  const layout = useMemo(
    () => new Layout(Layout.flat, new Point(40, 38), new Point(230, 245)),
    [],
  );

  const hexList = useMemo(() => {
    const newHexList = [];
    const N = 3;
    for (let q = -N; q <= N; q++) {
      const r1 = Math.max(-N, -q - N);
      const r2 = Math.min(N, -q + N);
      for (let r = r1; r <= r2; r++) {
        newHexList.push(new Hex(q, r, -q - r));
      }
    }
    console.log("newHexList", newHexList);
    return newHexList;
  }, []);

  const positions = useMemo(() => {
    const newPosList = [];
    hexList.forEach((element) => {
      const screenPos = layout.hexToPixel(element);
      newPosList.push(screenPos);
    });
    console.log("newPosList", newPosList);
    return newPosList;
  }, [hexList, layout]);

  return (
    <>
      {/* <img
        className="absolute top-4/9 left-1/2 -translate-1/2 scale-200 select-none z-20 opacity-35"
        src={board}
      /> */}
      <div className="absolute top-5/13 left-1/2 flex size-full max-h-2/3 max-w-lg -translate-1/2 flex-col items-center justify-center text-2xl font-black text-black">
        {positions.map((val) => (
          <div
            style={{
              position: "absolute",
              left: val.x * 1.2,
              top: val.y * 1.2,
            }}
            className="flex size-15 items-center justify-center rounded"
          >
            <Tile />
          </div>
        ))}
      </div>
    </>
  );
}
export default Board;

//frontend board, redblob calls this layout
//converting hex coords to screen coords
//screen to hex coords (for mouse clicks etc)
