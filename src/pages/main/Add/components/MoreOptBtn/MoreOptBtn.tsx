import { t } from "i18next";

export function MoreOptBtn(props: {
  isOpened?: boolean;
  setOpened: (val: boolean) => void;
}) {
  return (
    <button
      onClick={() => props.setOpened(!props.isOpened)}
      className="block font-semibold my-4 mx-auto"
    >
      <span>
        {props.isOpened ? t("addpage.lessoptbtn") : t("addpage.moreoptbtn")}
        <i
          className={`fi fi-rr-angle-small-down inline-block ml-2 transition-transform origin-center duration-300 ${
            props.isOpened ? "rotate-180" : "rotate-0"
          }`}
        ></i>
      </span>
    </button>
  );
}
