import { useMemo } from "react";
import Layout from "../util/layout";
import Point from "@cafe/shared/util/point";
import { Hex } from "@cafe/shared/util/hex";
import useMousePos from "../hooks/useMousePos";
import useBoardStore from "../stores/useBoardStore";
import { BOARD_SIZE } from "@cafe/engine/config";
import useSocket from "../../../socket/hooks/useSocket";
import useGameStore from "../stores/useGameStore";

export const Y_SQUASH = 0.7;
// export const BOARD_SIZE = 3;

const useBoard = () => {
  const mousePos = useMousePos();
  const boardRef = useBoardStore((state) => state.boardRef);
  const tileSize = useBoardStore((state) => state.tileSize);
  // const gameController = useGameStore((state) => state.gameController);
  const { isFirstPlayer } = useSocket();

  const layout = useMemo(
    () =>
      new Layout(
        Layout.flat,
        new Point(tileSize, tileSize * Y_SQUASH),
        new Point(0, 0),
      ),
    [tileSize],
  );

  //TODO - switch to hexList from gamestate
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
    const rotHex = isFirstPlayer ? hex : hex.mirror();
    return hex;
  }, [boardRef, mousePos, layout, isFirstPlayer]);

  const boardPos = useMemo(() => {
    const rect = boardRef?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(rect.left + rect.width * 0.5);
    const y = Math.round(rect.top + rect.height * 0.5);
    return { x: x, y: y };
  }, [boardRef]);

  const isMousedOverHexWithinBoard = isHexWithinBoard(mousedOverHex);

  // const spawnsInfo = useMemo(() => {
  //   const data = gameController.boardController.SpawnInfo;
  //   return data;
  // }, [gameController]);

  return {
    hexList,
    boardPos,
    mousedOverHex,
    isHexWithinBoard,
    isMousedOverHexWithinBoard,
    pixelFromHex,
    // spawnsInfo,
  };
};

export default useBoard;
