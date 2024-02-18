import { Text } from "@/components";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export function AddFirstTripSection() {
  const { t } = useTranslation();

  return (
    <Text.Secondary className="text-center">
      <NavLink
        to="/add"
        className="text-brand-500 underline underline-offset-2"
      >
        {t("homepage.addFirstTrip")}
      </NavLink>{" "}
      {t("homepage.stats.seeStatsAppear")}
    </Text.Secondary>
  );
}
