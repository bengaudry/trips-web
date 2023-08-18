import { t } from "i18next";
import { Cta } from "../../../components";
import { hasUserReachedMaxKms } from "../../../lib/functions";

export function ReachedMaxAlert() {
  if (hasUserReachedMaxKms()) {
    return (
      <section className="p-6 my-4 bg-neutral-200 dark:bg-grayblue-800 rounded-lg">
        <h2 className="font-bold text-2xl mb-3">
          {t("homepage.stats.congratsPopup.title")}
          {" 🎉"}
        </h2>
        <p className="text-slate-500 text-lg mb-6">
          {t("homepage.stats.congratsPopup.subtitle")}
        </p>
        <Cta type="link" to="certificate" color="gradient">
          {t("homepage.stats.congratsPopup.buttonContent")}
        </Cta>
      </section>
    );
  } else {
    return <></>;
  }
}
