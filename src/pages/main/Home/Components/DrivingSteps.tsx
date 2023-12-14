import { Text } from "components";
import { MAX_KMS_BEFORE_LICENSE } from "../../../../lib/constants";

function Step(props: {
  kmsNecessary: number;
  name: string;
  reached: () => boolean;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      <span
        className={`inline-block w-16 text-center font-medium text-md sm:text-xl ${
          props.reached()
            ? "bg-brand-500 text-white"
            : "bg-neutral-200 text-black dark:bg-grayblue-700 dark:text-white"
        } rounded-full`}
      >
        {props.kmsNecessary}
      </span>
      <Text.Secondary
        className={`font-medium text-md sm:text-lg ${
          props.reached() ? "text-neutral-900 dark:text-white" : ""
        }`}
      >
        {props.name}
        <i
          className={`${
            props.reached() ? "inline-block" : "hidden"
          } ml-2 fi fi-rr-check`}
        />
      </Text.Secondary>
    </div>
  );
}

export function DrivingSteps(props: { kmsPercent: number }) {
  return (
    <div className="flex flex-row h-full gap-1.5">
      <div className="w-1 rounded-full h-full bg-neutral-200 dark:bg-grayblue-600 overflow-hidden">
        <div
          className="w-full h-full bg-brand-300 rounded-full transition-transform origin-top"
          style={{ transform: `scaleY(${props.kmsPercent}%)` }}
        ></div>
      </div>
      <main className="flex flex-col justify-between h-full">
        <Step
          kmsNecessary={0}
          name="Rdv préalable"
          reached={() => props.kmsPercent > 0}
        />
        <Step
          kmsNecessary={MAX_KMS_BEFORE_LICENSE / 2}
          name="1er rdv"
          reached={() => props.kmsPercent >= MAX_KMS_BEFORE_LICENSE / 2}
        />
        <Step
          kmsNecessary={MAX_KMS_BEFORE_LICENSE}
          name="Permis"
          reached={() => props.kmsPercent >= MAX_KMS_BEFORE_LICENSE}
        />
      </main>
    </div>
  );
}
