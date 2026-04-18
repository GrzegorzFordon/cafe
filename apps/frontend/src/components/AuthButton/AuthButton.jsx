import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function AuthButton() {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.025, transition: { duration: 0.1 } }}
      whileTap={{ scale: 1 }}
      className="h-60px px-8 py-4 rounded-md text-black bg-amber-300 hover:bg-amber-600 active:bg-amber-900 font-bold text-lg cursor-pointer"
      onClick={() => navigate("/auth")}
    >
      PLAY NOW
    </motion.button>
  );
}
export default AuthButton;
