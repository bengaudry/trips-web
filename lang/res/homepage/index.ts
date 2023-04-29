import { MAX_KMS_BEFORE_LICENSE } from "../../../src/lib/constants";

export const homepage = {
  en: {
    header: {
      subtitle: "Good to see you back",
    },
    slider: {
      stats: "Statistics",
      trips: "Trips",
    },
    recent: {
      title: "Recent trips",
    },
    stats: {
      congratsPopup: {
        title: "Congratulations !",
        subtitle: `You have reached ${MAX_KMS_BEFORE_LICENSE} kilometers with us ! You are now ready to take your license !`,
        tipsTitle: "Tips",
        tipsParagraph:
          "We have prepared a few advices for you so you will be more than ready to succeed on D-Day...",
      },
    },
  },
  fr: {
    header: {
      subtitle: "Heureux de vous revoir",
    },
    slider: {
      stats: "Statistiques",
      trips: "Trajets",
    },
    recent: {
      title: "Trajets récents",
    },
    stats: {
      congratsPopup: {
        title: "Félicitations !",
        subtitle: `Vous avez atteint ${MAX_KMS_BEFORE_LICENSE} kilomètres avec nous ! Vous êtes maintenant prêt à passer votre permis !`,
        tipsTitle: "Conseils",
        tipsParagraph:
          "Nous avons préparé quelques conseils pour vous perfectionner et pour être plus que prêt le jour J...",
      },
    },
  },
};
