import { MAX_KMS_BEFORE_LICENSE } from "@/lib/constants";
import { Number } from "./components/Number";

export function PrettyProgress(props: { percent: number; className?: string }) {
  return (
    <div className="mt-8 relative w-full h-8">
      <div className="relative inset-0 grid grid-cols-3 gap-8 w-full h-8">
        <div className="pl-5 pr-12 w-full absolute top-1/2 -translate-y-1">
          <div className="h-0.5 bg-grayblue-800 rounded-full overflow-hidden grid">
            <div
              className={`h-full bg-white transition-[width] duration-1000 ease-out`}
              style={{ width: `${props.percent}%` }}
            ></div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between absolute">
          <Number active desc="Préalable" nb={0} />
          <Number
            isActivating={props.percent >= 50 && props.percent < 100}
            active={props.percent === 100}
            desc="1er rdv"
            nb={(MAX_KMS_BEFORE_LICENSE / 2) as 1500}
          />
          <Number
            isActivating={props.percent === 100}
            desc="Permis"
            nb={MAX_KMS_BEFORE_LICENSE}
          />
        </div>
      </div>
      <div
        className="h-0.5 bg-grayblue-700 rounded-full overflow-hidden absolute top-1/2 m-auto"
        style={{ width: "calc(100%- 2 * 2rem)" }}
      >
        <div
          className={`h-full bg-brand-500`}
          style={{ width: `${props.percent}%` }}
        ></div>
      </div>
    </div>
  );
}
