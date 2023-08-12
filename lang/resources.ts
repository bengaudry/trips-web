import { common } from "./res/common";
import { homepage } from "./res/homepage";
import { menu } from "./res/menu";
import { settingsPage } from "./res/settingsPage";
import { addpage } from "./res/addpage";

export const resources = {
  en: {
    translation: {
      common: common.en,
      menu: menu.en,
      homepage: homepage.en,
      addpage: addpage.en,
      settingsPage: settingsPage.en,
      popups: {
        notStandalone: {
          title: "Install the app",
          text: "Hmm, looks like you are using Trips on your browser. Trips can be installed on your device and it is much more comfortable.",
          buttonContent: "See how",
        },
      },
    },
  },
  fr: {
    translation: {
      common: common.fr,
      menu: menu.fr,
      homepage: homepage.fr,
      addpage: addpage.fr,
      settingsPage: settingsPage.fr,
      popups: {
        notStandalone: {
          title: "Installer l'app",
          text: "Il semblerait que vous utilisiez Trips sur votre navigateur. Trips peut être installé sur votre appareil et c'est beaucoup plus simple.",
          buttonContent: "Installer",
        },
      },
    },
  },
};
