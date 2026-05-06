import ReactRough, { Line, Rectangle } from "rough-react-wrapper";
import useAction from "../hooks/useAction";
import useBoard from "../hooks/useBoard";
import { useMemo } from "react";
import useWindowSize from "../hooks/useWindowSize";

function ActionPainter() {
  // const { actions } = useAction();
  // const { pixelFromHex, boardPos } = useBoard();
  // const { size } = useWindowSize();
  // const lines = useMemo(
  //   () =>
  //     actions.map((val) => {
  //       const pos = pixelFromHex(val.hex);
  //       const rectangleSize = 40;
  //       return (
  //         <Line
  //           key={pos}
  //           x1={pos.x + boardPos.x - 50}
  //           x2={pos.x + boardPos.x}
  //           y1={pos.y + boardPos.y - 50}
  //           y2={pos.y + boardPos.y}
  //           stroke="#6700c9"
  //           strokeWidth={2}
  //         />
  //         //   <Rectangle
  //         //     key={pos}
  //         //     height={rectangleSize}
  //         //     width={rectangleSize}
  //         //     x={pos.x + boardPos.x - rectangleSize * 0.5}
  //         //     y={pos.y + boardPos.y - rectangleSize * 0.5}
  //         //     fill="#6700c9"
  //         //     fillStyle={"cross-hatch"}
  //         //   />
  //       );
  //     }),
  //   [actions, pixelFromHex],
  // );
  // return (
  //   <div
  //     draggable={false}
  //     className="pointer-events-none absolute top-1/2 left-1/2 z-50 -translate-1/2 select-none"
  //   >
  //     <ReactRough renderer={"svg"} width={size.width} height={size.height}>
  //       {/* {lines} */}
  //     </ReactRough>
  //   </div>
  // );
}
export default ActionPainter;
