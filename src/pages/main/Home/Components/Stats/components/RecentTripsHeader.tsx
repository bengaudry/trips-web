import { useTranslation } from "react-i18next";
import { Text } from "@/components";

export function RecentTripsHeader(props: { onSeeAll: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center justify-between mb-4 ">
      <Text.Title rank={2} className="block">
        {t("homepage.recent.title")}
      </Text.Title>
      <button className="block h-fit" onClick={props.onSeeAll}>
        <Text.Secondary>{t("common.seeAll")}</Text.Secondary>
      </button>
    </div>
  );
}
