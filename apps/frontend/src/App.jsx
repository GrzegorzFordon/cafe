import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { VFXProvider } from "react-vfx";
import { useEffect } from "react";
import { enableMapSet } from "immer";

function App() {
  enableMapSet();
  const handleContextMenu = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.addEventListener("contextmenu", handleContextMenu);
  });

  return (
    <VFXProvider>
      <div className="flex h-dvh w-dvw">
        <RouterProvider router={router} />
      </div>
    </VFXProvider>
  );
}

export default App;
