import { useEffect, useState, useMemo, useCallback } from "react";
import Layout from "../components/board/layout";
import Point from "../../../../../../../packages/shared/util/point";
import { Hex } from "../../../../../../../packages/shared/util/hex";

const useBoard = (size, pos) => {
  const layout = useMemo(
    () =>
      new Layout(
        Layout.flat,
        new Point(size.x, size.y),
        new Point(pos.x, pos.y),
      ),
    [pos, size],
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

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mousedOverHex, setMousedOverHex] = useState(new Hex(0, 0, 0));

  const handleMouseMove = useCallback(
    (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      //   console.log(mousePos);
      const hex = layout.pixelToHexRounded(new Point(mousePos.x, mousePos.y));
      //   console.log(hex);
      setMousedOverHex(hex);
    },
    [layout, mousePos],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return { mousePos, layout, mousedOverHex, positions };
};

export default useBoard;
