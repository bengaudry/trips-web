import { t } from "i18next";
import { Cta, Text } from "@/components";
import { hasUserReachedMaxKms } from "@/lib/functions";

export function ReachedMaxAlert() {
  return hasUserReachedMaxKms() ? (
    <section className="p-6 my-4 bg-neutral-100 dark:bg-grayblue-800 rounded-lg">
      <Text.Title rank={2} className="mb-3">
        {t("homepage.stats.congratsPopup.title")}
        {" 🎉"}
      </Text.Title>
      <Text.Secondary className="text-lg mb-6">
        {t("homepage.stats.congratsPopup.subtitle")}
      </Text.Secondary>
      <Cta type="link" to="certificate" color="gradient">
        {t("homepage.stats.congratsPopup.buttonContent")}
      </Cta>
    </section>
  ) : (
    <></>
  );
}
