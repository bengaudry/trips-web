import { useTranslation } from "react-i18next";
import { MouseEvent } from "react";
import { Text } from "../../texts";

export function BackButton(props: {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();

  return (
    <button
      className="font-medium text-lg mb-8 block"
      onClick={(e) => props.onClick(e)}
      aria-label="Go back to previous page"
    >
      <Text.Secondary className="flex flex-row items-center gap-2">
        <i className="fi fi-rr-angle-left block text-sm"></i>
        <span className="block h-min -translate-y-0.5">
          {t("common.back", "Back")}
        </span>
      </Text.Secondary>
    </button>
  );
}
