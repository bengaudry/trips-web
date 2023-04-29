import { ReactNode } from "react";
import { Cta } from "../Buttons/Cta";
import { useTranslation } from "react-i18next";

interface CenteredPopupProps {
  children: ReactNode;
  visible: boolean;
  setVisible: (val: boolean) => void;
}

export function CenteredPopup(props: CenteredPopupProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`${
        props.visible
          ? "bg-black/80 pointer-events-auto"
          : "bg-transparent pointer-events-none"
      } fixed  flex flex-row items-center justify-center inset-0 transition-colors duration-500 z-50 lg:items-center`}
    >
      <button
        className="absolute z-40 w-full h-screen cursor-default"
        onClick={() => props.setVisible(false)}
      ></button>
      <div
        className={`absolute z-50 bg-grayblue-800 border border-grayblue-600 p-6 w-[calc(100vw-4rem)] max-w-screen-sm rounded-xl max-h-[calc(100vh-8rem)] overflow-scroll transition-all duration-500 ${
          props.visible
            ? "scale-1 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <main className={`w-full text-left overflow-y-scroll`}>
          {props.children}
          <Cta
            type="button"
            className="mt-6 sticky bottom-0 shadow-2xl shadow-grayblue-900"
            onClick={() => props.setVisible(false)}
          >
            {t("common.close")}
          </Cta>
        </main>
      </div>
    </div>
  );
}
