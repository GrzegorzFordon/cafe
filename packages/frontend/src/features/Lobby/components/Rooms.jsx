import Room from "./Room";
import RoomsCard from "./RoomsCard";
import RoomsListMenu from "./RoomsMenu";

function RoomsList() {
  return (
    <div className="size-full max-w-lg max-h-80 bg-amber-950 rounded flex flex-col gap-2 p-2 justify-center items-center">
      <div className="size-full bg-amber-800 rounded flex flex-col gap-2 justify-start items-center overflow-y-scroll text-black italic p-2">
      </div>
      <RoomsListMenu/>
    </div>
  );
}
export default RoomsList;
