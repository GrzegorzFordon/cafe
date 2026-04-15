import "./styles/App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
