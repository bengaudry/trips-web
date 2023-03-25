import { useTranslation } from "react-i18next";
import { NavBarElement } from "./components/NavLink";

export function NavBar() {
  const { t } = useTranslation();
  return (
    <nav className="fixed bottom-0 z-30 w-full bg-neutral-800/60 backdrop-blur-md py-3 pb-10 border-t border-neutral-600 max-w-screen-sm">
      <ul className="grid grid-cols-3 items-center px-16 h-full max-w-screen-sm m-auto">
        <NavBarElement icon="apps" label={t("menu.home")} to="/" />
        <NavBarElement icon="add" label={t("menu.add")} to="/add" />
        <NavBarElement icon="user" label={t("menu.settings")} to="/settings" />
      </ul>
    </nav>
  );
}
