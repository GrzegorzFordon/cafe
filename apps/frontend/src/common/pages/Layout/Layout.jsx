import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
      <div className="flex flex-col size-full justify-center items-center">
        <NavBar />
        <Outlet />
      </div>
  );
}
export default Layout;
