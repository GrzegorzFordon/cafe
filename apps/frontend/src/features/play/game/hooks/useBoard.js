import { useMemo } from "react";
import Layout from "../util/layout";
import Point from "@cafe/shared/util/point";
import { Hex } from "@cafe/shared/util/hex";
import useMousePos from "../hooks/useMousePos";
import useBoardStore from "../../../../stores/useBoardStore";

export const Y_SQUASH = 0.7;

const useBoard = () => {
  const mousePos = useMousePos();
  const boardRef = useBoardStore((state) => state.boardRef);
  const tileSize = useBoardStore((state) => state.tileSize);

  const layout = useMemo(
    () =>
      new Layout(
        Layout.flat,
        new Point(tileSize, tileSize * Y_SQUASH),
        new Point(0, 0),
      ),
    [tileSize],
  );

  //use board size from game state (room state?) instead of N
  //probably choose map size in room window
  const hexList = useMemo(() => {
    const newHexList = [];
    const N = 2;
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
    const rect = boardRef && boardRef.getBoundingClientRect();
    const left = rect ? rect.left : 0;
    const top = rect ? rect.top : 0;
    const offsetMousePos = {
      x: Math.round(mousePos.x - left),
      y: Math.round(mousePos.y - top),
    };
    const hex = layout.pixelToHexRounded(offsetMousePos);
    return hex;
  }, [layout, mousePos, boardRef]);

  return { layout, positions, mousedOverHex };
};

export default useBoard;
