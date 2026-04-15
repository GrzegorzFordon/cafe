import "./layout.css"
import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
      <div className="layout">
        <NavBar />
        <Outlet />
      </div>
  );
}
export default Layout;
