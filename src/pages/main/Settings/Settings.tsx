import { useEffect, useState } from "react";

import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "../../../../server";

import { useTranslation } from "react-i18next";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { legal } from "../../../../public/texts/legal";
import { APP_VERSION } from "../../../lib/constants/appVersion";

import {
  NotVerifiedEmailPopup,
  PageLayout,
  Text,
  SlidingPage,
  BackButton,
} from "components";
import { Setting } from "./Components/Setting";
import { ProfilePopup } from "./Components/ProfilePopup/ProfilePopup";
import { LangPopup } from "./Components/LangPopup/LangPopup";
import { DrivingSchool } from "./Components/DrivingScool/DrivingSchool";
import { BetaPage } from "./Components/BetaPage/BetaPage";
import { CurrentUser } from "api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type SlidingPages = "profile" | "help" | "beta" | "language";

export function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [slidingPageVisible, setSlidingPageVisible] = useState(false);
  const [slidingPageContent, setSlidingPageContent] =
    useState<SlidingPages>("profile");

  // Disable scroll on body when opening popup
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

  const CurrPageView = {
    profile: <ProfilePopup />,
    help: <ReactMarkdown>{legal}</ReactMarkdown>,
    beta: <BetaPage />,
    language: <LangPopup />,
  }[slidingPageContent];

  return (
    <motion.div
      key={"settings"}
      initial={{ transform: "translateX(100%)"}}
      animate={{ transform: "translateX(0)"}}
      exit={{ transform: "translateX(100%)"}}
      transition={{ duration: 0.25, bounce: false }}
    >
      <PageLayout>
        <BackButton onClick={() => navigate("/")} />
        <Text.Title className="mb-3">{t("settingsPage.title")}</Text.Title>

        <section className="my-5 bg-neutral-100 dark:bg-grayblue-800 rounded-full">
          <Setting
            color="82, 82, 82"
            icon="user"
            subTitle={t("settingsPage.personalInfo") as string}
            name={CurrentUser.getDisplayName() as string}
            onClick={() => changeSlidingPage("profile")}
            bigIcon
            className="w-full h-full py-5 px-6"
          />

          <NotVerifiedEmailPopup />
        </section>

        <section className="py-5">
          <Setting
            color="209, 96, 224"
            icon="test-tube"
            name="Beta"
            onClick={() => changeSlidingPage("beta")}
          />

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
        </section>

        {/* {window.location.toString() === "http://localhost:5173/settings" && (
        <div className="relative p-6">
          <h3 className="text-3xl font-semibold mb-4 mt-10">Mon auto-école</h3>
          <Text.Secondary className="text-lg">
            Vous n'avez pas rejoint d'auto école. Si votre auto-école utilise
            Trips, demandez leur un code pour rejoindre leur organisation.
          </Text.Secondary>
          <DrivingSchool />
        </div>
      )
   */}

        <Text.Secondary className="w-full text-center">
          App version : {APP_VERSION}
        </Text.Secondary>
        <Text.Secondary className="w-full text-center">
          {new Date().getFullYear()} - All rights reserved
        </Text.Secondary>

        <SlidingPage
          isOpened={slidingPageVisible}
          setPanelOpened={(val) => setSlidingPageVisible(val)}
        >
          {CurrPageView}
        </SlidingPage>
      </PageLayout>
    </motion.div>
  );
}
