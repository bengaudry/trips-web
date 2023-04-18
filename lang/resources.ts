import { common } from "./res/common";
import { homepage } from "./res/homepage";
import { menu } from "./res/menu";
import { settingsPage } from "./res/settingsPage";
import { addpage } from "./res/addpage"

export const resources = {
  en: {
    translation: {
      common: common.en,
      menu: menu.en,
      homepage: homepage.en,
      addpage: addpage.en,
      settingsPage: settingsPage.en,
    },
  },
  fr: {
    translation: {
      common: common.fr,
      menu: menu.fr,
      homepage: homepage.fr,
      addpage: addpage.fr,
      settingsPage: settingsPage.fr,
    },
  },
};
