import "./authButton.css";
import { useNavigate } from "react-router";
function AuthButton() {
  const navigate = useNavigate();
  return (
    <button className="authButton" onClick={() => navigate("/auth")}>
      PLAY NOW
    </button>
  );
}
export default AuthButton;
