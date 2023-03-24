import i18n from "i18next";

export function LangPopup() {
  function handleChangeLanguage(lang: "fr" | "en") {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">Change language</h2>
      <div className="flex flex-col w-full gap-2">
        <button
          onClick={() => handleChangeLanguage("fr")}
          className="w-full flex gap-3 text-left bg-neutral-800 rounded-lg px-4 py-2 font-semibold"
        >
          <span>🇫🇷</span>
          <span>Français</span>
        </button>
        <button
          onClick={() => handleChangeLanguage("en")}
          className="w-full flex gap-3 text-left bg-neutral-800 rounded-lg px-4 py-2 font-semibold"
        >
          <span>🇬🇧</span>
          <span>English</span>
        </button>
      </div>
    </>
  );
}
