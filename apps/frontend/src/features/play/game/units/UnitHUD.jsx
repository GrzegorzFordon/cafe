import exhaustedIcon from "../../../../assets/sleepy.png";
import chargedIcon from "../../../../assets/sun.png";
import crownSprite from "../assets/crown.png";

function UnitHUD({
  atk,
  speed,
  hp,
  isFriendly,
  isExhausted,
  isCharged,
  isLeader,
  isLegalTarget,
}) {
  return (
    <div draggable={false} className="pointer-events-none select-none">
      <p className="absolute right-0 -bottom-2 aspect-square size-5 text-center text-green-400 text-shadow-black/60 text-shadow-sm">
        {hp ?? 7}
      </p>
      <p className="absolute right-2 bottom-0 aspect-square size-5 text-center text-red-500 text-shadow-black/60 text-shadow-sm">
        {atk ?? 0}
      </p>
      <p className="absolute top-0 left-1/4 aspect-square size-5 -translate-1/2 text-center text-orange-300 text-shadow-black/60 text-shadow-sm">
        {speed ?? 0}
      </p>
      {isExhausted && (
        <img
          src={exhaustedIcon}
          className="absolute top-1/2 left-1/2 -translate-1/2 scale-80"
        ></img>
      )}
      {isCharged && (
        <img
          src={chargedIcon}
          className="absolute top-2/5 left-1/2 -z-20 -translate-1/2 scale-150"
        ></img>
      )}
      {!isFriendly && (
        <div className="absolute top-1/2 left-1/2 flex size-fit -translate-1/2 scale-80 items-center justify-center rounded-sm bg-red-950 text-sm text-red-300 opacity-80">
          ENEMY
        </div>
      )}

      {isLeader && (
        <img
          className="pointer-events-none absolute top-2/7 left-3/5 -translate-1/2 scale-45 rotate-18"
          src={crownSprite}
        />
      )}
      {isLegalTarget && (
        <div className="absolute top-1/2 left-1/2 flex size-fit -translate-1/2 scale-80 items-center justify-center rounded-sm bg-green-950 text-sm text-green-300 opacity-80">
          TARGET
        </div>
      )}
    </div>
  );
}
export default UnitHUD;
