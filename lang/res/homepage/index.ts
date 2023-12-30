import { MAX_KMS_BEFORE_LICENSE } from "@/lib/constants";

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
        title: "Congratulations",
        subtitle: `You have reached ${MAX_KMS_BEFORE_LICENSE} kilometers with us ! You are now ready to take your license !\nDiscover what we prepared for you so you will be more than ready to succeed on D-Day.`,
        buttonContent: "Discover my surprise",
        tipsTitle: "Tips",
        tipsParagraph:
          "We have analyzed the way you drive and came up with a few advices for you so you will be more than ready to succeed on D-Day...",
      },
      whyWaiting: "What are you waiting for ?",
      seeStatsAppear: "to see your stats here.",
    },
    addFirstTrip: "Add your first trip",
    emptyTripsList: "No trips yet",
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
        title: "Félicitations",
        subtitle: `Vous avez atteint ${MAX_KMS_BEFORE_LICENSE} kilomètres avec nous ! Vous êtes maintenant prêt à passer votre permis !\nDécouvre tout ce que nous avons préparé pour que tu puisses réussir au mieux ton examen.`,
        buttonContent: "Accéder à la surprise",
        tipsTitle: "Conseils",
        tipsParagraph:
          "Nous avons analysé votre conduite et nous en avons déduit quelques conseils pour vous perfectionner et être plus que prêt le jour J...",
      },
      whyWaiting: "Qu'attendez-vous ?",
      seeStatsAppear: "pour voir vos stats apparaître ici.",
    },
    addFirstTrip: "Ajoutez un premier trajet",
    emptyTripsList: "Aucun trajet pour le moment",
  },
};
