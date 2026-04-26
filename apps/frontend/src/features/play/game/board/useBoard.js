import { useMemo } from "react";
import Layout from "./layout";
import Point from "../../../../../../../packages/shared/util/point";
import { Hex } from "../../../../../../../packages/shared/util/hex";
import useMousePos from "../hooks/useMousePos";

const useBoard = (size, pos) => {
  const mousePos = useMousePos();

  const layout = useMemo(
    () =>
      new Layout(
        Layout.flat,
        new Point(size.x, size.y),
        new Point(pos.x, pos.y),
      ),
    [pos, size],
  );

  //use board size from game state (room state?) instead of N
  //probably choose map size in room window
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
    return newHexList;
  }, []);

  const positions = useMemo(() => {
    const newPosList = [];
    hexList.forEach((element) => {
      const screenPos = layout.hexToPixel(element);
      newPosList.push(screenPos);
    });
    return newPosList;
  }, [hexList, layout]);

  const mousedOverHex = useMemo(() => {
    const hex = layout.pixelToHexRounded(mousePos);
    return hex;
  }, [layout, mousePos]);

  return { layout, positions, mousePos, mousedOverHex };
};

export default useBoard;
