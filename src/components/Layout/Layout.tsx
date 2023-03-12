import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

export function Layout () {
  return <div className="App bg-stone-900 text-white text-xl">
    <NavBar />
    <Outlet />
  </div>
}
