import pfp from "../../assets/pfp.png";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
function ProfileCard() {
  const navigate = useNavigate();
  const accessTokenData = useAuthStore((state) => state.accessTokenData);
  const USER_NAME = accessTokenData?.username;

  return (
    <motion.div
      whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
      whileTap={{ scale: 1.05 }}
      className="flex bg-amber-200 rounded h-14 w-36 items-center justify-evenly transition duration-75"
      onClick={() => navigate("/profile")}
    >
      <div className="text-gray-900">{USER_NAME ?? "UserNme"}</div>
      <div className="size-12 rounded-full overflow-hidden">
        <img src={pfp} width={"100%"} />
      </div>
    </motion.div>
  );
}
export default ProfileCard;
