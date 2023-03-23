import { Outlet } from "react-router-dom";
import { NavBar } from "../../components";

export function Layout () {
  return <div className="App text-white bg-neutral-900 mb-16 max-w-screen-sm m-auto">
    <NavBar />
    <Outlet />
  </div>
}
