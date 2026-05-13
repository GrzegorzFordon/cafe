import frame from "../../../assets/frames/frame01.png";
import hero from "../../../assets/frames/hero01.png";
function FramedHero() {
  return (
    <div className="absolute size-full overflow-hidden -rotate-2 scale-150 -left-1/3">
      <img
        className="absolute top-1/2 left-1/2 w-50 -translate-1/2 scale-70"
        src={hero}
        alt=""
      />
      <img
        className="absolute top-1/2 left-1/2 -translate-1/2 w-50"
        src={frame}
        alt=""
      />
    </div>
  );
}
export default FramedHero;
