import image from "../../assets/home.png";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthWindow() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex bg-gray-700 rounded-md size-full max-w-xl max-h-96 gap-2 p-2 align-middle">
      <div className="flex relative justify-start align-middle size-full bg-gray-800 rounded-md overflow-hidden">
        <img
          className="top-0 left-0 size-full absolute object-cover overflow-hidden"
          src={image}
          width={"60%"}
        />
      </div>
      <div className="flex flex-col p-2 gap-4  size-full bg-gray-900 rounded-md items-center">
        <h1 className="text-4xl select-none">
          {showLogin ? "LOGIN" : "REGISTER"}
        </h1>
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <button
          className="bg-gray-500 hover:bg-gray-700 rounded  text-gray-900  w-4/5 py-2 px-4"
          onClick={() => setShowLogin(!showLogin)}
        >
          {showLogin ? "sign up instead" : "login instead"}
        </button>
      </div>
    </div>
  );
}
export default AuthWindow;
