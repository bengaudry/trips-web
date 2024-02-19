import { Outlet } from "react-router-dom";
import { Loader, NavBar } from "@/components";

export function Layout({
  offline,
  loaderVisible,
}: {
  offline: boolean;
  loaderVisible: boolean;
}) {
  return (
    <div className="App dark:text-grayblue-100 dark:bg-grayblue-900 mx-auto lg:pl-72">
      {/* {loaderVisible && <Loader />} */}

      {offline && (
        <div className="fixed top-6 right-6 bg-red-500/50 backdrop-blur-lg px-6 py-2 rounded-full md:hover:scale-110 transition-transform duration-300">
          <i className="inline-block fi fi-rr-down-left-and-up-right-to-center mr-2 translate-y-0.5"></i>
          <span>App is offline</span>
        </div>
      )}

      <NavBar />
      <div className="max-w-screen-md mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
