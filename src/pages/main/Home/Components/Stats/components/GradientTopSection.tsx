import { MAX_KMS_BEFORE_LICENSE as MAX } from "@/lib/constants";
import { useTranslation } from "react-i18next";

function Stat(props: { val: number | string; desc: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold">{props.val}</span>
      <span className="text-neutral-300 font-medium">{props.desc}</span>
    </div>
  );
}

export function GradientTopSection(props: {
  tripsNb: number;
  totalKms: number;
  totalDrivingTime: { nb: number; unit: string };
}) {
  const { t } = useTranslation();
  const { tripsNb, totalKms, totalDrivingTime } = props;

  return (
    <section
      className={`rounded-xl h-max py-6 px-8 text-grayblue-100 bg-gradient-to-tr from-sky-600 to-indigo-600`}
    >
      <div className="grid grid-cols-3 items-center justify-between">
        <Stat val={totalKms >= MAX ? `${MAX}+` : totalKms} desc="km" />
        <Stat
          val={tripsNb}
          desc={t(tripsNb > 1 ? "common.trips" : "common.trip")}
        />
        <Stat val={totalDrivingTime.nb} desc={totalDrivingTime.unit} />
      </div>
    </section>
  );
}
