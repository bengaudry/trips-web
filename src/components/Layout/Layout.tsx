import { Outlet } from "react-router-dom";
import { NavBar } from "../../components";

export function Layout () {
  return <div className="App dark:text-white dark:bg-grayblue-900 mb-16 m-auto lg:pl-72">
    <NavBar />
    <div className="max-w-screen-md mx-auto">
      <Outlet />
    </div>
  </div>
}
