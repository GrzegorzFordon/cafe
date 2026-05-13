import { useNavigate } from "react-router";

import door from "../../../assets/homeArt/door.png";
function Door() {
  const navigate = useNavigate();

  return (
    <div className="z-10 size-fit select-none">
      <div
        onClick={() => navigate("/auth")}
        className="absolute right-3/18 bottom-1/15 aspect-auto origin-bottom-right scale-y-95 cursor-pointer duration-300 hover:rotate-y-30"
      >
        <img src={door} alt="" />
      </div>
    </div>
  );
}
export default Door;
