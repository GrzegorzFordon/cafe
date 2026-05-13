import sprite from "../../../assets/shop.png";
import table from "../../../assets/lobby_table.png";
import shopsign from "../../../assets/shopsign.png";
function Shop() {
  return (
    <div className="relative flex size-full items-center justify-center text-2xl font-bold text-black">
      <img
        className="absolute bottom-1/10 left-4/10 -translate-1/2 scale-150"
        src={sprite}
        alt=""
      />
      <img
        className="absolute right-1/10 bottom-1/10 scale-100"
        src={table}
        alt=""
      />
      <img
        className="absolute left-1/10 top-0/10 scale-70 origin-top"
        src={shopsign}
        alt=""
      />
    </div>
  );
}
export default Shop;
