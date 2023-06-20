import { Outlet } from "react-router-dom";
import { NavBar, NotStandaloneAlert } from "../../components";
import { useState, useEffect } from "react";

export function Layout() {
  const [runningInBrowser, setRunningInBrowser] = useState(false);

  // Check if the web app is running in standalone mode on iOS devices
  const isInStandaloneMode = () =>
    window.matchMedia("(display-mode: standalone)").matches;

  useEffect(() => {
    setRunningInBrowser(!isInStandaloneMode());
  }, []);

  return (
    <div className="App dark:text-white dark:bg-grayblue-900 mb-16 m-auto lg:pl-72">
      <NavBar />
      <div className="max-w-screen-md mx-auto">
        <NotStandaloneAlert shown={runningInBrowser} setShown={setRunningInBrowser} />
        <Outlet />
      </div>
    </div>
  );
}
