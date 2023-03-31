import { Number } from "./components/Number";

export function PrettyProgress(props: { percent: number; className?: string }) {
  return (
    <div className="mt-8 relative w-full h-8">
      <div className="relative inset-0 grid grid-cols-3 gap-8 w-ful h-8">
        <div
          className="h-0.5 bg-neutral-700 rounded-full overflow-hidden absolute top-1/2 m-auto w-full"
          style={{ width: "calc(100%- 2 * 2rem)" }}
        >
          <div
            className={`h-full bg-violet-500`}
            style={{ width: `${props.percent}%` }}
          ></div>
        </div>
        <div className="w-full flex flex-row justify-between absolute">
          <Number active>1</Number>
          <Number
            isActivating={props.percent >= 50 && props.percent < 100}
            active={props.percent === 100}
          >
            2
          </Number>
          <Number isActivating={props.percent === 100}>3</Number>
        </div>
      </div>
      <div
        className="h-0.5 bg-neutral-700 rounded-full overflow-hidden absolute top-1/2 m-auto"
        style={{ width: "calc(100%- 2 * 2rem)" }}
      >
        <div
          className={`h-full bg-violet-500`}
          style={{ width: `${props.percent}%` }}
        ></div>
      </div>
    </div>
  );
}
