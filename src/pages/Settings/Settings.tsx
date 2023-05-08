import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "../../../server";
import { useEffect, useState } from "react";
import { NotVerifiedEmailPopup, SlidingPage } from "../../components";
import { Setting } from "./Components/Setting";
import { ProfilePopup } from "./Components/ProfilePopup/ProfilePopup";
import { useTranslation } from "react-i18next";
import { LangPopup } from "./Components/LangPopup/LangPopup";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { legal } from "../../../public/texts/legal";
import { DrivingSchool } from "./Components/DrivingScool/DrivingSchool";

type SlidingPages = "profile" | "help" | "language";

export function Settings() {
  const { t } = useTranslation();

  const [slidingPageVisible, setSlidingPageVisible] = useState(false);
  const [slidingPageContent, setSlidingPageContent] =
    useState<SlidingPages>("profile");

  useEffect(() => {
    if (slidingPageVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [slidingPageVisible]);

  const changeSlidingPage = (page: SlidingPages) => {
    setSlidingPageContent(page);
    setSlidingPageVisible(true);
  };

  return (
    <div className="px-5 pt-16 pb-32">
      <h2 className="text-4xl font-bold mb-6">{t("settingsPage.title")}</h2>
      <h3 className="text-3xl font-semibold">
        {t("settingsPage.subtitles.account")}
      </h3>

      <Setting
        color="82, 82, 82"
        icon="user"
        subTitle={t("settingsPage.personalInfo") as string}
        name={getFirebaseAuth().currentUser?.displayName as string}
        onClick={() => changeSlidingPage("profile")}
        bigIcon
      />

      <NotVerifiedEmailPopup />

      <h3 className="text-3xl font-semibold mb-4 mt-10">
        {t("settingsPage.subtitles.settings")}
      </h3>

      <Setting
        color="125, 211, 252"
        icon="interrogation"
        name={t("settingsPage.buttons.help")}
        onClick={() => changeSlidingPage("help")}
      />

      <Setting
        color="253, 186, 116"
        icon="world"
        name={t("settingsPage.buttons.lang")}
        onClick={() => changeSlidingPage("language")}
      />

      <Setting
        color="252, 165, 165"
        icon="exit"
        name={t("settingsPage.buttons.logout")}
        onClick={() => {
          if (confirm(t("common.messages.logoutConfirm") as string)) {
            localStorage.removeItem("connected");
            signOut(getFirebaseAuth());
          }
        }}
        reduceIconSize
      />

      <div className="relative p-6">
        <h3 className="text-3xl font-semibold mb-4 mt-10">Mon auto-école</h3>
        <p className="text-lg text-neutral-500 dark:text-grayblue-500">
          Vous n'avez pas rejoint d'auto école. Si votre auto-école utilise
          Trips, demandez leur un code pour rejoindre leur organisation.
        </p>
        <DrivingSchool />

        {window.location.toString() === "http://localhost:5173/settings" ? (
          <></>
        ) : (
          <p className="absolute w-full h-full backdrop-blur-md inset-0 flex flex-row items-center justify-center text-xl">
            Shht, this is secret for now 🤫
          </p>
        )}
      </div>

      <SlidingPage
        isOpened={slidingPageVisible}
        setPanelOpened={(val) => setSlidingPageVisible(val)}
      >
        {slidingPageContent === "profile" ? (
          <ProfilePopup />
        ) : slidingPageContent === "help" ? (
          <ReactMarkdown>{legal}</ReactMarkdown>
        ) : (
          <LangPopup />
        )}
      </SlidingPage>
    </div>
  );
}
