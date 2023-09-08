import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Text } from "components";

function LangBtn(props: {
  lang: "fr" | "en" | "auto";
  flag: string;
  children: string;
}) {
  function handleChangeLanguage(lang: "fr" | "en") {
    i18n.changeLanguage(lang);
    localStorage.setItem("app-lang", lang);
  }
  return (
    <button
      onClick={() => {
        props.lang === "auto"
          ? localStorage.removeItem("app-lang")
          : handleChangeLanguage(props.lang);
      }}
      className={`${
        props.lang === "auto"
          ? localStorage.getItem("app-lang") === undefined
            ? "bg-neutral-100 dark:bg-grayblue-800"
            : "bg-transparent"
          : i18n.language === props.lang
          ? "bg-neutral-100 dark:bg-grayblue-800"
          : "bg-transparent"
      } w-full flex gap-3 text-left rounded-lg px-4 py-2 font-medium dark:border-grayblue-800 border-2 transition-colors duration-300`}
    >
      <span>{props.flag}</span>
      <span>{props.children}</span>
    </button>
  );
}

export function LangPopup() {
  const { t } = useTranslation();
  return (
    <>
      <Text.Title rank={2} className="mb-4">
        {t("settingsPage.popups.chooseLang.title")}
      </Text.Title>
      <div className="flex flex-col w-full gap-2">
        {/* <LangBtn lang="auto" flag="🇫🇷">
          Auto
        </LangBtn> */}
        <LangBtn lang="fr" flag="🇫🇷">
          Français
        </LangBtn>
        <LangBtn lang="en" flag="🇬🇧">
          English
        </LangBtn>
      </div>
    </>
  );
}
