import { useTranslation } from "react-i18next";
import { NavBarElement } from "./components/NavLink";
import { NavLink } from "react-router-dom";
import { CurrentUser } from "@/api";
import { Text } from "@/components";

export function NavBar() {
  const { t } = useTranslation();

  return (
    <nav
      className={`fixed bottom-0 z-30 w-screen bg-neutral-100/60 dark:bg-grayblue-800/60 backdrop-blur-md py-3 pb-10 border-t border-neutral-200 dark:border-grayblue-600 lg:border-0 lg:w-72 lg:fixed lg:flex lg:flex-col lg:h-screen lg:top-0 lg:left-0 lg:p-0 lg:rounded-r-xl lg:justify-between lg:bg-[url("/noisy-gradient.png")] lg:bg-center lg:bg-no-repeat lg:bg-cover`}
    >
      <div>
        <div className="hidden lg:flex items-center gap-3 px-4 py-5 border-b-gray-100 dark:border-b-gray-700 border-b">
          <img
            src="/icons/icon-svg.svg"
            alt="Trips icon"
            className="w-10 rounded-lg"
          />
          <p className="text-xl font-semibold">Trips</p>
        </div>
        <ul className="grid grid-cols-3 items-center px-4 h-full w-full max-w-screen-sm m-auto lg:flex lg:flex-col lg:py-4 lg:gap-1">
          <NavBarElement icon="apps" label={t("menu.home")} to="/" />
          <NavBarElement icon="add" label={t("menu.add")} to="/add" />
          <div className="lg:hidden">
            <NavBarElement
              icon="user"
              label={t("menu.settings")}
              to="/settings"
            />
          </div>
        </ul>
      </div>
      <div className="hidden lg:flex border-t-gray-100 dark:border-t-gray-700 border-t p-4">
        <NavLink to="/settings" className="w-full">
          <div className="flex flex-row gap-3 items-center p-2 w-full hover:bg-grayblue-700/40 rounded-lg transition-colors duration-300">
            <Text.Secondary>
              <i className="fi fi-rr-user text-2xl block translate-y-1 text-inherit" />
            </Text.Secondary>
            <div className="flex flex-col justify-center">
              <span>
                Mon profil{" "}
                <i className="inline-block fi fi-rr-arrow-right translate-y-1" />
              </span>
              <Text.Secondary className="text-neutral-500">
                {CurrentUser.getEmail()}
              </Text.Secondary>
            </div>
          </div>
        </NavLink>
      </div>
    </nav>
  );
}
