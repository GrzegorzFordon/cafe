import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { VFXProvider } from "react-vfx";

function App() {
  return (
    <VFXProvider>
      <div className="flex h-dvh w-dvw">
        <RouterProvider router={router} />
      </div>
    </VFXProvider>
  );
}

export default App;
