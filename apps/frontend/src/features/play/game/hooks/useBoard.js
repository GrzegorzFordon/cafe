import { useMemo } from "react";
import Layout from "../util/layout";
import Point from "../../../../../../../packages/shared/util/point";
import { Hex } from "../../../../../../../packages/shared/util/hex";
import useMousePos from "../hooks/useMousePos";

export const TILE_SIZE = 50;
export const Y_SQUASH = 0.7;

const useBoard = () => {
  const mousePos = useMousePos();

  const layout = useMemo(
    () =>
      new Layout(
        Layout.flat,
        new Point(TILE_SIZE, TILE_SIZE * Y_SQUASH),
        new Point(0, 0),
      ),
    [],
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

  return { layout, positions, mousedOverHex };
};

export default useBoard;
