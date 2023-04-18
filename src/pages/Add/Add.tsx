import { useState } from "react";
import { Input, Select, Checkbox, Suggestions } from "../../components/form";
import { Cta } from "../../components";
import { getFirebaseAuth } from "../../../server";
import { addTrip } from "../../lib/functions";
import { useTranslation } from "react-i18next";

export function Add() {
  const { t } = useTranslation();

  // Fields values
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [length, setLength] = useState("");
  const [duration, setDuration] = useState("");
  const [roadType, setRoadType] = useState("Countryside");
  const [trafficDensity, setTrafficDensity] = useState("Average");
  const [weather, setWeather] = useState("Sun");
  const [roundTrip, setRoundTrip] = useState(false);

  // Functionnal states
  const [moreOptionsOpened, setMoreOptionsOpened] = useState(false);
  const [fromInputFocused, setFromInputFocused] = useState(false);
  const [toInputFocused, setToInputFocused] = useState(false);

  const handleSubmit = () => {
    console.log(
      addTrip({
        date: date,
        time: time,
        roadType: roadType,
        trafficDensity: trafficDensity,
        weather: weather,
        from: from,
        to: to,
        length: parseInt(length),
        duration: parseInt(duration),
        roundTrip: roundTrip,
        uid: getFirebaseAuth().currentUser?.uid as string,
      })
    );
  };

  const fetchWeather = (city: string) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city
        .toLowerCase()
        .replaceAll(" ", "-")}&appid=a2e5136e11a3fcade3163e0626675146`
    )
      .then((value) => {
        return value.json();
      })
      .then((json) => {
        console.log(json);
        if ("weather" in json) {
          const w = json.weather[0].main;
          if (
            w === "Clouds" ||
            w === "Rain" ||
            w === "Sun" ||
            w === "Fog" ||
            w === "Drizzle" ||
            w === "Wind" ||
            w === "Snow"
          ) {
            setWeather(json.weather[0].main);
          }
        } else {
          throw new Error("The city has not been found");
        }
      })
      .catch((err) => {
        console.error(`[api weather] : ${err}`);
      });
  };

  return (
    <div className="px-5 py-16 pb-44">
      <form onSubmit={(e) => e.preventDefault()}></form>
      <h1 className="text-4xl font-bold">{t("addpage.title")}</h1>
      <div className="grid grid-flow-col-dense gap-4">
        <Input
          name={t("addpage.inputs.labels.date")}
          type="date"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          required
        />
        <Input
          name={t("addpage.inputs.labels.time")}
          type="time"
          value={time}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTime(e.target.value)
          }
          required
        />
      </div>
      <Input
        name={t("addpage.inputs.labels.from")}
        type="text"
        value={from}
        placeholder={t("addpage.inputs.placeholders.from") satisfies string}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFrom(e.target.value)
        }
        onFocus={() => setFromInputFocused(true)}
        onBlur={() => setFromInputFocused(false)}
        required
      >
        {/* <Suggestions
          location={from}
          onChange={(value: string) => {
            setFrom(value);
          }}
          className={`${fromInputFocused ? "" : "hidden"}`}
        /> */}
      </Input>
      <Input
        name={t("addpage.inputs.labels.to")}
        type="text"
        value={to}
        placeholder={t("addpage.inputs.placeholders.to") satisfies string}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTo(event.target.value);
        }}
        onFocus={(event: React.ChangeEvent<HTMLInputElement>) => {
          setToInputFocused(true);
        }}
        onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
          setToInputFocused(false);
          console.log(fetchWeather(event.target.value));
        }}
        required
      >
        {/* <Suggestions
          onLocationChange={(value: string) => {
            setTo(value);
          }}
          className={`${toInputFocused ? "" : "hidden"}`}
        /> */}
      </Input>
      <div className="grid grid-cols-2 gap-4">
        <Input
          name={t("addpage.inputs.labels.length")}
          type="number"
          value={length}
          placeholder={t("addpage.inputs.placeholders.length") satisfies string}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLength(e.target.value)
          }
          required
        />
        <Input
          name={t("addpage.inputs.labels.duration")}
          type="number"
          value={duration}
          placeholder={
            t("addpage.inputs.placeholders.duration") satisfies string
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDuration(e.target.value)
          }
          required
        />
      </div>
      <button
        onClick={() => setMoreOptionsOpened(!moreOptionsOpened)}
        className="block font-semibold mt-4 mx-auto"
      >
        <span>
          {moreOptionsOpened
            ? t("addpage.lessoptbtn")
            : t("addpage.moreoptbtn")}
          <i
            className={`fi fi-rr-angle-small-down inline-block ml-2 transition-transform origin-center duration-300 ${
              moreOptionsOpened ? "rotate-180" : "rotate-0"
            }`}
          ></i>
        </span>
      </button>
      <div
        className={`${
          moreOptionsOpened ? "scale-y-full h-full" : "scale-y-0 h-0"
        } transition-all origin-top duration-300`}
      >
        <Select
          name={t("addpage.inputs.labels.roadtype")}
          selectedOption={roadType}
          setSelectedOption={setRoadType}
          options={[
            {
              name: "Countryside",
            },
            {
              name: "Expressway",
            },
            {
              name: "Highway",
            },
            {
              name: "City",
            },
          ]}
        />
        <Select
          name={t("addpage.inputs.labels.traffic")}
          selectedOption={trafficDensity}
          setSelectedOption={setTrafficDensity}
          options={[
            {
              name: "Low",
            },
            {
              name: "Average",
            },
            {
              name: "High",
            },
            {
              name: "Heavy",
            },
          ]}
        />
        <Select
          name={t("addpage.inputs.labels.weather")}
          selectedOption={weather}
          setSelectedOption={setWeather}
          options={[
            {
              name: "Sun",
            },
            {
              name: "Clouds",
            },
            {
              name: "Rain",
            },
            {
              name: "Fog",
            },
            {
              name: "Wind",
            },
            {
              name: "Snow",
            },
            {
              name: "Drizzle",
            },
          ]}
        />
        <Checkbox
          name={t("addpage.inputs.labels.roundtrip")}
          checked={roundTrip}
          setChecked={(val: boolean) => setRoundTrip(val)}
        />
      </div>
      <Cta
        type="button"
        btnType="submit"
        className="mt-4 sticky bottom-32 shadow-2xl shadow-brand-200/70 dark:shadow-grayblue-900 lg:bottom-8"
        onClick={() => {
          console.log(handleSubmit());
        }}
      >
        Add trip
      </Cta>
    </div>
  );
}
