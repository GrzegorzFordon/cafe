import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
// import { VFXProvider } from "react-vfx";

function App() {
  return (
    <div className="flex h-dvh w-dvw">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
