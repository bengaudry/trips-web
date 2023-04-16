import { useTranslation } from "react-i18next";
import { NavBarElement } from "./components/NavLink";

export function NavBar() {
  const { t } = useTranslation();
  
  return (
    <nav className="fixed bottom-0 z-30 w-screen bg-grayblue-800/60 backdrop-blur-md py-3 pb-10 border-t border-grayblue-600 lg:w-72 lg:fixed lg:h-screen lg:top-0 lg:left-0">
      <div className="hidden lg:flex lg:items-center lg:gap-4 px-4 py-6">
        <img src="/icons/icon-svg.svg" alt="Trips icon" className="w-12" />
        <p className="text-2xl font-bold">Trips</p>
      </div>
      <ul className="grid grid-cols-3 items-center px-8 h-full w-full max-w-screen-sm m-auto lg:flex lg:flex-col lg:py-4 lg:gap-6">
        <NavBarElement icon="apps" label={t("menu.home")} to="/" />
        <NavBarElement icon="add" label={t("menu.add")} to="/add" />
        <NavBarElement icon="user" label={t("menu.settings")} to="/settings" />
      </ul>
    </nav>
  );
}
