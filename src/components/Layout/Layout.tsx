import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

export function Layout () {
  return <div className="App text-white bg-slate-900 mb-16">
    <NavBar />
    <Outlet />
  </div>
}
