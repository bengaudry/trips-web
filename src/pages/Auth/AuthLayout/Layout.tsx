import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="dark:text-grayblue-100">
      <Outlet />
    </div>
  );
}
