import { t } from "i18next";
import { Select } from "@/components/form";
import { Dispatch, SetStateAction } from "react";

export type OtherOptionsT = {
  roadTypes: number[];
  trafficDensities: number[];
  weatherTypes: number[];
};

type OtherOptProps = {
  otherOptState: OtherOptionsT;
  setOtherOptState: Dispatch<SetStateAction<OtherOptionsT>>;
};

export function OtherOptions(props: OtherOptProps) {
  const { roadTypes, trafficDensities, weatherTypes } = props.otherOptState;

  const editValueInState = <K extends keyof OtherOptionsT>(
    key: K,
    val: OtherOptionsT[K]
  ) => {
    props.setOtherOptState((oldState) => ({
      ...oldState,
      [key]: val,
    }));
  };

  return (
    <div className="mt-4">
      <Select
        name={t("addpage.inputs.labels.roadtype")}
        multi
        selectedOptions={roadTypes}
        setSelectedOptions={(val) => editValueInState("roadTypes", val)}
        options={[
          {
            name: t("common.roadTypes.countryroad"),
          },
          {
            name: t("common.roadTypes.expressway"),
          },
          {
            name: t("common.roadTypes.highway"),
          },
          {
            name: t("common.roadTypes.city"),
          },
        ]}
      />
      <Select
        name={t("addpage.inputs.labels.traffic")}
        multi
        selectedOptions={trafficDensities}
        setSelectedOptions={(val) => editValueInState("trafficDensities", val)}
        options={[
          {
            name: t("common.trafficDensities.low"),
            icon: "signal-alt",
          },
          {
            name: t("common.trafficDensities.average"),
            icon: "signal-alt-1",
          },
          {
            name: t("common.trafficDensities.high"),
            icon: "signal-alt-2",
          },
          {
            name: t("common.trafficDensities.heavy"),
            icon: "comment-exclamation",
          },
        ]}
      />
      <Select
        name={t("addpage.inputs.labels.weather")}
        multi
        selectedOptions={weatherTypes}
        setSelectedOptions={(val) => editValueInState("weatherTypes", val)}
        options={[
          {
            name: t("common.weatherTypes.clouds"),
            icon: "clouds",
          },
          {
            name: t("common.weatherTypes.rain"),
            icon: "cloud-rain",
          },
          {
            name: t("common.weatherTypes.sun"),
            icon: "sun",
          },
          {
            name: t("common.weatherTypes.fog"),
            icon: "smog",
          },
          {
            name: t("common.weatherTypes.drizzle"),
            icon: "cloud-drizzle",
          },
          {
            name: t("common.weatherTypes.wind"),
            icon: "wind",
          },
          {
            name: t("common.weatherTypes.snow"),
            icon: "snowflake",
          },
        ]}
      />
    </div>
  );
}
