import {
  User,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirebaseAuth } from "../../../server";
import { useEffect, useState } from "react";
import { NotVerifiedEmailPopup, SlidingPage } from "../../components";
import { Setting } from "./Components/Setting";
import { ProfilePopup } from "./Components/ProfilePopup/ProfilePopup";
import { useTranslation } from "react-i18next";
import { LangPopup } from "./Components/LangPopup/LangPopup";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { legal } from "../../../public/texts/legal";

export function Settings() {
  const { t } = useTranslation();

  const [changePasswordPopupShown, setChangePasswordPopupShown] =
    useState(false);
  const [langPopupShown, setLangPopupShown] = useState(false);
  const [helpPopupShown, setHelpPopupShown] = useState(false);

  useEffect(() => {
    if (helpPopupShown || langPopupShown || changePasswordPopupShown) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "scroll"
    }
  }, [helpPopupShown, langPopupShown, changePasswordPopupShown])

  return (
    <div className="px-5 pt-16">
      <h2 className="text-4xl font-bold mb-6">{t("settingsPage.title")}</h2>
      <h3 className="text-3xl font-semibold">
        {t("settingsPage.subtitles.account")}
      </h3>

      {/* <input
          type="text"
          className="bg-grayblue-800"
          onChange={(e) => {
            updateProfile(getFirebaseAuth().currentUser as User, {
              displayName: e.target.value,
            });
          }}
        /> */}

      <Setting
        color="82, 82, 82"
        icon="user"
        subTitle={t("settingsPage.personalInfo") as string}
        name={getFirebaseAuth().currentUser?.displayName as string}
        onClick={() => setChangePasswordPopupShown(true)}
        bigIcon
      />

      <SlidingPage
        isOpened={changePasswordPopupShown}
        setPanelOpened={(val: boolean) => setChangePasswordPopupShown(val)}
      >
        <ProfilePopup />
      </SlidingPage>

      <NotVerifiedEmailPopup />

      <h3 className="text-3xl font-semibold mb-4 mt-10">
        {t("settingsPage.subtitles.settings")}
      </h3>

      <Setting
        color="125, 211, 252"
        icon="interrogation"
        name={t("settingsPage.buttons.help")}
        onClick={() => setHelpPopupShown(true)}
      />
      <SlidingPage
        setPanelOpened={(val: boolean) => setHelpPopupShown(val)}
        isOpened={helpPopupShown}
        className="prose"
      >
        <ReactMarkdown>{legal}</ReactMarkdown>
      </SlidingPage>
      <Setting
        color="253, 186, 116"
        icon="world"
        name={t("settingsPage.buttons.lang")}
        onClick={() => setLangPopupShown(true)}
      />
      <SlidingPage
        isOpened={langPopupShown}
        setPanelOpened={(val: boolean) => setLangPopupShown(val)}
      >
        <LangPopup />
      </SlidingPage>
      <Setting
        color="252, 165, 165"
        icon="exit"
        name={t("settingsPage.buttons.logout")}
        onClick={() => {
          if (confirm(t("common.messages.logoutConfirm") as string)) {
            localStorage.setItem("connected", "false");
            signOut(getFirebaseAuth());
          }
        }}
        reduceIconSize
      />
    </div>
  );
}
