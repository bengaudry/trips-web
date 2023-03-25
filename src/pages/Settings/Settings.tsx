import {
  User,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirebaseAuth } from "../../../server";
import { useState } from "react";
import { SlidingPage } from "../../components";
import { Setting } from "./Components/Setting";
import { ProfilePopup } from "./Components/ProfilePopup/ProfilePopup";
import { useTranslation } from "react-i18next";
import { LangPopup } from "./Components/LangPopup/LangPopup";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export function Settings() {
  const [changePasswordPopupShown, setChangePasswordPopupShown] =
    useState(false);
  const [langPopupShown, setLangPopupShown] = useState(false);
  const [helpPopupShown, setHelpPopupShown] = useState(false);

  const { t } = useTranslation();

  const [legalMd, setLegalMd] = useState<any>();
  fetch("https://tripsapp.web.app/legal.md", {
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    }).then((val) => {
    console.log(val);
    setLegalMd(val.body);
  });

  return (
    <>
      <div className="px-5 py-16">
        <h2 className="text-4xl font-bold mb-6">{t("settingsPage.title")}</h2>
        <h3 className="text-3xl font-semibold">
          {t("settingsPage.subtitles.account")}
        </h3>

        {/* <input
          type="text"
          className="bg-neutral-800"
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

        {!getFirebaseAuth().currentUser?.emailVerified ? (
          <div className="w-full flex flex-col items-center rounded-lg px-4 py-2 mt-2 bg-yellow-600">
            <p className="flex flex-row items-center gap-2">
              <i className="fi fi-rr-exclamation"></i>
              <span className="-translate-y-0.5">
                Your email is not verified !
              </span>
            </p>
            <button
              onClick={() => {
                if (getFirebaseAuth().currentUser !== null) {
                  sendEmailVerification(getFirebaseAuth().currentUser as User);
                }
              }}
              className="underline font-semibold"
            >
              Send me an email
            </button>
          </div>
        ) : (
          <></>
        )}

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
        >
          <ReactMarkdown>{legalMd}</ReactMarkdown>
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
              signOut(getFirebaseAuth());
            }
          }}
          reduceIconSize
        />
      </div>
    </>
  );
}
