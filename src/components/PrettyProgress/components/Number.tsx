import { MAX_KMS_BEFORE_LICENSE } from "../../../lib/constants";

export function Number(props: {
  nb: 0 | 1500 | 3000;
  active?: boolean;
  isActivating?: boolean;
  desc: string;
}) {
  return (
    <div
      className={`
      ${
        props.active
          ? "bg-white border-white text-grayblue-900"
          : props.isActivating
          ? "bg-grayblue-800 border-white text-white"
          : "bg-grayblue-800 border-grayblue-800 text-white"
      } relative grid place-content-center place-items-center min-w-9 px-2 text-center rounded-full font-semibold border-2`}
    >
      {props.nb}
      <span
        className={`absolute top-[calc(100%+.35rem)] text-white ${
          props.nb === 0
            ? "left-0 text-left"
            : props.nb === 1500
            ? "text-center"
            : "right-0 text-right"
        } leading-4`}
      >
        {props.desc}
      </span>
    </div>
  );
}
