import { BURN_TYPES } from "@cafe/engine/config";
import { useMemo } from "react";

const colorFromBurnType = (type) => {
  switch (type) {
    case BURN_TYPES.MOVE:
      return "#8BA662";
    case BURN_TYPES.POWER:
      return "#A6628B";
    case BURN_TYPES.SPEED:
      return "#628BA6";

    default:
      return "#FFFFFF";
  }
};

function CardBurnEffectsView({ data }) {
  const list = useMemo(
    () =>
      data.map((val,i) => {
        const color = colorFromBurnType(val);
        return (
          <div
            key={i}
            style={{ backgroundColor: color }}
            className="relative size-6 rounded-full shadow-black/40"
          >
            <div className="absolute top-1/2 left-1/2 size-4 -translate-1/2 rounded-full bg-black/40 bg-blend-multiply shadow-black/40" />
          </div>
        );
      }),
    [data],
  );

  return (
    <div className="absolute -top-2 right-0 flex size-fit flex-col items-center justify-start gap-0.5">
      {list}
      {/* {JSON.stringify(data)} */}
    </div>
  );
}
export default CardBurnEffectsView;
