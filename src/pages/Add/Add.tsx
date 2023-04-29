import { useState } from "react";
import { Input, Select, Checkbox, Suggestions } from "../../components/form";
import { AuthError, Cta } from "../../components";
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

  // Error states
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = () => {
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
    });
  };

  const allFieldsFilled = (): boolean => {
    if (date === "" || !date) return false;
    if (time === "" || !time) return false;
    if (roadType === "" || !roadType) return false;
    if (trafficDensity === "" || !trafficDensity) return false;
    if (weather === "" || !weather) return false;
    if (from === "" || !from) return false;
    if (to === "" || !to) return false;
    if (parseInt(length) <= 0 || length === "" || !length) return false;
    if (parseInt(duration) <= 0 || duration === "" || !duration) return false;
    if (typeof roundTrip !== "boolean" || !roundTrip) return false;
    return true;
  };

  const fetchWeather = (city: string) => {
    if (city.length > 1) {
      const OPW_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city
          .toLowerCase()
          .replaceAll(" ", "-")}&appid=${OPW_API_KEY}`
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
            } else if (w === "Clear") {
              setWeather("Sun");
            }
          } else {
            throw new Error("The city has not been found");
          }
        })
        .catch((err) => {
          console.error(`[api weather] : ${err}`);
        });
    }
  };

  return (
    <div className="px-5 py-16 pb-44">
      <AuthError
        visible={errorVisible}
        setVisible={setErrorVisible}
        content="Veuillez remplir tous les champs"
      />
      <h1 className="text-4xl font-bold">{t("addpage.title")}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-flow-col-dense gap-4">
          <Input
            name={t("addpage.inputs.labels.date")}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
          <Input
            name={t("addpage.inputs.labels.time")}
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </div>
        <Input
          name={t("addpage.inputs.labels.from")}
          type="text"
          value={from}
          placeholder={t("addpage.inputs.placeholders.from") satisfies string}
          onChange={(event) => setFrom(event.target.value)}
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
          onChange={(event) => {
            setTo(event.target.value);
          }}
          onFocus={() => {
            setToInputFocused(true);
          }}
          onBlur={(event) => {
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
            placeholder={
              t("addpage.inputs.placeholders.length") satisfies string
            }
            onChange={(event) => setLength(event.target.value)}
            required
          />
          <Input
            name={t("addpage.inputs.labels.duration")}
            type="number"
            value={duration}
            placeholder={
              t("addpage.inputs.placeholders.duration") satisfies string
            }
            onChange={(event) => setDuration(event.target.value)}
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
                icon: "sun",
              },
              {
                name: "Clouds",
                icon: "clouds",
              },
              {
                name: "Rain",
                icon: "cloud-rain",
              },
              {
                name: "Fog",
                icon: "smog",
              },
              {
                name: "Wind",
                icon: "wind",
              },
              {
                name: "Snow",
                icon: "snowflake",
              },
              {
                name: "Drizzle",
                icon: "cloud-drizzle",
              },
            ]}
          />
          <Checkbox
            name={t("addpage.inputs.labels.roundtrip")}
            checked={roundTrip}
            setChecked={(val) => setRoundTrip(val)}
          />
        </div>
        <Cta
          type="button"
          btnType="submit"
          className="mt-4 sticky bottom-32 shadow-2xl shadow-brand-200/70 dark:shadow-grayblue-900 lg:bottom-8"
          onClick={() => {
            if (allFieldsFilled()) {
              handleSubmit();
              setErrorVisible(false);
              return;
            }
            setErrorVisible(true);
          }}
        >
          Add trip
        </Cta>
      </form>
    </div>
  );
}
