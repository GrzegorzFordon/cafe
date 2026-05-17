import useSocketStore from "../../../../stores/useSocketStore";
import BonusIndicators from "./BonusIndicators";
import SpeedIndicator from "./SpeedIndicator";

function SideBoard() {
  const roomData = useSocketStore((state) => state.roomData);

  return (
    <div className="absolute left-1/4 flex h-72 w-16 flex-col items-center justify-around rounded-sm bg-amber-50">
      <BonusIndicators data={{ power: 0, speed: 1, move: 1 }} />
      <SpeedIndicator />
      <BonusIndicators data={{ power: 0, speed: 1, move: 1 }} />
      {JSON.stringify(roomData)}
    </div>
  );
}
export default SideBoard;
