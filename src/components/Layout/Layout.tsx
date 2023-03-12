import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

export function Layout () {
  return <div className="App text-white text-xl bg-slate-900">
    <NavBar />
    <Outlet />
  </div>
}
