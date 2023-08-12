import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

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
      } grid w-full transition-[grid-template-rows,padding] duration-500 bg-neutral-200 dark:bg-grayblue-800 overflow-hidden rounded-b-3xl`}
    >
      <main
        className={`overflow-hidden grid-rows-[1/span2] px-6`}
        style={{ gridRow: "1 / span 2" }}
      >
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-2xl font-semibold">
            {t("popups.notStandalone.title")}
          </h3>
          <button onClick={() => props.setShown(false)}>
            <i className="fi fi-rr-cross text-grayblue-500"></i>
          </button>
        </div>
        <p className="text-grayblue-500 mt-2 mb-4">
          {t("popups.notStandalone.text")}
        </p>
        {props.shown}
        <NavLink
          to="/install"
          className="bg-brand-500 text-white px-4 py-1 rounded-full"
          onClick={() => props.setShown(false)}
        >
          {t("popups.notStandalone.buttonContent")}{" "}
          <i className="fi fi-rr-arrow-alt-right inline-block translate-y-1 ml-2"></i>
        </NavLink>
      </main>
    </div>
  );
}
