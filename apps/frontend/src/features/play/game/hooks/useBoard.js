import { useMemo } from "react";
import Layout from "../util/layout";
import Point from "@cafe/shared/util/point";
import { Hex } from "@cafe/shared/util/hex";
import useMousePos from "../hooks/useMousePos";
import useBoardStore from "../stores/useBoardStore";

export const Y_SQUASH = 0.7;
export const BOARD_SIZE = 2;

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

  const hexList = useMemo(() => {
    const newHexList = [];
    const N = BOARD_SIZE;
    for (let q = -N; q <= N; q++) {
      const r1 = Math.max(-N, -q - N);
      const r2 = Math.min(N, -q + N);
      for (let r = r1; r <= r2; r++) {
        newHexList.push(new Hex(q, r, -q - r));
      }
    }
    return newHexList;
  }, []);

  const pixelFromHex = (hex) => {
    return layout.hexToPixel(hex);
  };
  const isHexWithinBoard = (hex) => {
    return (
      Math.abs(hex.q) <= BOARD_SIZE &&
      Math.abs(hex.r) <= BOARD_SIZE &&
      Math.abs(hex.s) <= BOARD_SIZE
    );
  };

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

  return { hexList, mousedOverHex, isHexWithinBoard, pixelFromHex };
};

export default useBoard;
