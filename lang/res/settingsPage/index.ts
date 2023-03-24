import { chooseLang } from "./popups/chooseLang";

export const settingsPage = {
  en: {
    title: "Settings",
    subtitles: {
      account: "Account",
      settings: "Settings",
    },
    personalInfo: "Personal info",
    buttons: {
      help: "Help",
      lang: "Language",
      logout: "Logout",
    },
    popups: {
      chooseLang: chooseLang.en,
    }
  },
  fr: {
    title: "Paramètres",
    subtitles: {
      account: "Compte",
      settings: "Paramètres",
    },
    personalInfo: "Mes informations",
    buttons: {
      help: "Aide",
      lang: "Langue",
      logout: "Se déconnecter",
    },
    popups: {
      chooseLang: chooseLang.fr,
    }
  },
};
