import { useTranslation } from "react-i18next";

export function BackButton(props: { onClick: CallableFunction }) {
  const { t } = useTranslation();

  return (
    <button
      className="text-neutral-400 dark:text-grayblue-400 font-semibold text-lg mb-8 flex flex-row items-center gap-2"
      onClick={(e) => props.onClick(e)}
    >
      <i className="fi fi-rr-angle-left block text-sm"></i>
      <span className="block h-min -translate-y-0.5">{t("common.back", "Back")}</span>
    </button>
  );
}
