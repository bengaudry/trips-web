import { Outlet } from "react-router-dom";

export function AuthLayout () {
  return <div className="App text-white bg-slate-900 mb-16">
  <Outlet />
</div>
}