import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Cta, JoinBetaPopup, Text } from "@/components";
import { useTranslation } from "react-i18next";

export function Landing() {
  const { t } = useTranslation();

  const isStandaloneMode = () => {
    return window.matchMedia("(display-mode: standalone)").matches;
  };

  if (isStandaloneMode()) {
    return (
      <div className="p-8 pb-16 absolute bottom-0 dark:bg-grayblue-800 rounded-t-3xl w-full">
        <h1 className="text-4xl font-semibold text-center dark:text-grayblue-100">
          Trips
        </h1>
        <p className="text-lg text-center text-grayblue-500 mt-4">
          Sign in to add a trip or
          <br /> to see your previous ones
        </p>
        <Cta type="link" className="mt-6" to="/auth">
          Let's get started
        </Cta>
        <Text.Secondary></Text.Secondary>
      </div>
    );
  }

  const [joinBetaPopupShown, setJoinBetaPopupShown] = useState(false);

  return (
    <main className="relative">
      <JoinBetaPopup
        opened={joinBetaPopupShown}
        onClose={() => setJoinBetaPopupShown(false)}
      />

      <header className="backdrop-blur-md bg-[#ffffff20] text-grayblue-100 fixed z-40 top-0 w-screen left-0 right-0 border-b border-b-[#ffffff50]">
        <div className="max-w- flex flex-row justify-between items-center px-10 py-2">
          <div>
            <img
              src="/icons/icon-svg.svg"
              alt=""
              className="aspect-square w-12"
            />
          </div>
          <NavLink to="/auth" className="flex flex-row gap-2 font-medium">
            <span>{t("landing.header.signInBtnContent")}</span>
            <i className="fi fi-rr-arrow-right translate-y-0.5" />
          </NavLink>
        </div>
      </header>

      <section
        className="bg-contain bg-center min-h-[90vh] grid place-content-center pb-12 px-10 text-grayblue-100"
        style={{
          background: 'url("/gradient.png")',
        }}
      >
        <h1 className="text-3xl sm:text-5xl font-bold block max-w-3xl mb-4 sm:mb-8">
          {t("landing.body.title")}
        </h1>
        <p className="text-md sm:text-xl max-w-3xl">
          {t("landing.body.description")}
        </p>
        <button
          onClick={() => setJoinBetaPopupShown(true)}
          className="bg-blue-600 text-grayblue-100 md:hover:bg-brand-800 transition-colors duration-300 shadow-xl px-6 py-2 rounded-full mt-4 w-max"
        >
          {t("landing.body.joinBetaBtnContent")}
        </button>
      </section>

      {/* <section>
        <h2>Commencez à utiliser Trips gratuitement</h2>
        <div>
          <NavLink to="/auth">Accéder à l'app</NavLink>

        </div>
      </section> */}

      <footer className="h-[10vh] grid place-content-center text-center">
        <span>{t("landing.footer.copyright")}</span>
        <a href="https://github.com/bengaudry/trips-web" className="underline">
          {t("landing.footer.githubBtnContent")}
        </a>
      </footer>
    </main>
  );
}
