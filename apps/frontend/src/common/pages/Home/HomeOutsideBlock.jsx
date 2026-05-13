import dinoSprite from "../../../assets/t-rex-skull.png";
function HomeOutsideBlock() {
  return (
    <div className="relative flex h-96 w-full items-center justify-center bg-amber-950 text-2xl font-black text-black">
      <p>ABOUT (in the dirt, so clever)</p>
      <img
        src={dinoSprite}
        alt=""
        className="absolute right-1/10 -bottom-1/10 scale-30"
      />
    </div>
  );
}
export default HomeOutsideBlock;
