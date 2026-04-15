import "./profileCard.css";
import pfp from "../../assets/pfp.png";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router";

function ProfileCard() {
  const navigate = useNavigate();
  const accessTokenData = useAuthStore((state) => state.accessTokenData);
  const USER_NAME = accessTokenData?.username;

  return (
    <div
      className="profileCard__container"
      onClick={() => navigate("/profile")}
    >
      <div className="profileCard__info">{USER_NAME ?? "UserNme"}</div>
      <div className="profileCard__avatar">
        <img src={pfp} width={"100%"} />
      </div>
    </div>
  );
}
export default ProfileCard;
