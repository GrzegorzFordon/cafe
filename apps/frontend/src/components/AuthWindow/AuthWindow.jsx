import "./authWindow.css";
import image from "../../assets/home.png";

import LoginForm from "./LoginForm";
import { useState } from "react";
import RegisterForm from "./RegisterForm";

function AuthWindow() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="authWindow__container">
      <div className="authWindow__art">
        <img className="mainImage" src={image} width={"60%"} />
      </div>
      <div className="authWindow__form">
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <button style={{padding:"1em 2em"}} onClick={() => setShowLogin(!showLogin)}>
        <p>{showLogin?"Don't have an account yet? Register now":"Already registered? Login instead."}</p>
          {/* {showLogin ? "Register" : "Login"} */}
        </button>
      </div>
    </div>
  );
}
export default AuthWindow;
