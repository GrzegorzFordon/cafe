import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";

function App() {
  return (
    <div className="flex w-dvw h-dvh">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
