import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="dark:text-white">
      <Outlet />
    </div>
  );
}
