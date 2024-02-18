import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export function NoTripsWarning() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        src="/illustrations/empty-list.png"
        alt="An illustration of an empty place..."
        width={300}
        className="block mx-auto"
      />
      <p>{t("homepage.stats.whyWaiting")}</p>
      <NavLink
        to="/add"
        className="text-brand-400 underline underline-offset-2"
      >
        {t("homepage.addFirstTrip")}
      </NavLink>
    </div>
  );
}
