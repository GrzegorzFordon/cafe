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
      data.map((val) => {
        const color = colorFromBurnType(val);
        return (
          <div
            style={{ backgroundColor: color }}
            className="size-6 rounded-full bg-green-50 shadow-black/40"
          ></div>
        );
      }),
    [data],
  );

  return (
    <div className="absolute -top-1 -right-1 flex size-fit flex-col gap-0.5 justify-start items-center">
      {list}
    </div>
  );
}
export default CardBurnEffectsView;
