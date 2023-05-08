import { useTranslation } from "react-i18next";
import { MouseEvent } from "react";

export function BackButton(props: {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();

  return (
    <button
      className="text-neutral-400 dark:text-grayblue-400 font-medium text-lg mb-8 flex flex-row items-center gap-2"
      onClick={(e) => props.onClick(e)}
      aria-label="Go back to previous page"
    >
      <i className="fi fi-rr-angle-left block text-sm"></i>
      <span className="block h-min -translate-y-0.5">
        {t("common.back", "Back")}
      </span>
    </button>
  );
}
