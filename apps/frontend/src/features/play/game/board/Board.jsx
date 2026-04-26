import Tile from "./Tile";
import useBoard from "../hooks/useBoard";
import { useEffect, useMemo, useRef, useState } from "react";

const SIZE_A = 50;
const SIZE_BOARD = 600;

function Board() {
  const ref = useRef();
  const { positions, mousePos, layout } = useBoard(
    { x: SIZE_A, y: SIZE_A * 0.7 },
    { x: SIZE_BOARD * 0.5 * 0.9, y: SIZE_BOARD * 0.5 * 0.7 },
  );

  const [localmousepos, setLocalmousepos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    const offsetpos = {
      x: Math.round(mousePos.x - rect.left + rect.width * 0 * 0.5),
      y: Math.round(mousePos.y - rect.top + rect.height * 0 * 0.5),
    };
    setLocalmousepos(offsetpos);
  }, [mousePos]);

  const mousedOverHex = useMemo(() => {
    const hex = layout.pixelToHexRounded(localmousepos);
    return hex;
  }, [layout, localmousepos]);

  return (
    <div
      ref={ref}
      style={{ width: SIZE_BOARD * 0.9, height: SIZE_BOARD * 0.7 }}
      className="absolute top-3/7 left-1/2 flex -translate-1/2 flex-col items-center justify-center rounded bg-amber-50 text-2xl font-black text-black"
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
          <Tile
            coords={layout.pixelToHexRounded(val)}
            hoveredcoords={mousedOverHex}
          />
        </div>
      ))}
    </div>
  );
}
export default Board;
