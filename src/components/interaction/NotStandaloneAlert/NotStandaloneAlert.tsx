import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { SecondaryText } from "../../texts";

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
      <main className="overflow-hidden h-max px-6">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-2xl font-semibold">
            {t("popups.notStandalone.title")}
          </h3>
          <button onClick={() => props.setShown(false)}>
            <SecondaryText>
              <i className="fi fi-rr-cross" />
            </SecondaryText>
          </button>
        </div>
        <SecondaryText className="mt-2 mb-4">
          {t("popups.notStandalone.text")}
        </SecondaryText>
        {props.shown}
        <NavLink
          to="/install"
          className="flex items-center justify-center gap-2 w-full bg-brand-500 text-white px-4 py-1 rounded-full"
          onClick={() => props.setShown(false)}
        >
          {t("popups.notStandalone.buttonContent")}
          <i className="block fi fi-rr-arrow-right translate-y-0.5" />
        </NavLink>
      </main>
    </div>
  );
}
