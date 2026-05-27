import builderSprite from "../../../assets/deckbuilder.jpg";

function DeckBuilder() {
  return (
    <div className="flex size-9/10 items-center justify-center text-2xl font-bold text-black">
      <img src={builderSprite} alt="" className="size-fit"/>
    </div>
  );
}
export default DeckBuilder;
