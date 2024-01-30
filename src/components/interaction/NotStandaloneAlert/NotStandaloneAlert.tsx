import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Text } from "@/components/texts";

type NotStandaloneAlertProps = {
  shown: boolean;
  setShown: (val: boolean) => void;
};

export function NotStandaloneAlert(props: NotStandaloneAlertProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`${
        props.shown ? "grid-rows-[1fr] py-6" : "grid-rows-[0fr] py-0"
      } grid w-full h-max transition-[grid-template-rows,padding] duration-500 overflow-hidden bg-neutral-100 dark:bg-grayblue-800 rounded-b-3xl`}
    >
      <main
        className="overflow-hidden grid-rows-[1/span2] px-6"
        style={{ gridRow: "1 / span 2" }}
      >
        <div className="flex flex-row items-center justify-between">
          <Text.Title rank={3}>{t("popups.notStandalone.title")}</Text.Title>
          <button onClick={() => props.setShown(false)}>
            <Text.Secondary>
              <i className="fi fi-rr-cross" />
            </Text.Secondary>
          </button>
        </div>
        <Text.Secondary className="mt-2 mb-4">
          {t("popups.notStandalone.text")}
        </Text.Secondary>
        {props.shown}
        <NavLink
          to="/install"
          className="flex items-center justify-center gap-2 w-full bg-brand-500 text-grayblue-100 px-4 py-1 rounded-full"
          onClick={() => props.setShown(false)}
        >
          {t("popups.notStandalone.buttonContent")}
          <i className="block fi fi-rr-arrow-right translate-y-0.5" />
        </NavLink>
      </main>
    </div>
  );
}
