import { useEffect, useState } from "react";
import { t } from "i18next";

import { Input } from "../../components/form";
import { Notification, Cta, PageLayout } from "../../components";
import { OtherOptions } from "./components";
import type { OtherOptionsT } from "./components";

import { getFirebaseAuth } from "../../../server";
import { addTrip } from "../../lib/functions";
import { Weather } from "../../types";
import { MoreOptBtn } from "./components/MoreOptBtn/MoreOptBtn";

const getCurrentTime = (): string => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const getCurrentDate = (): string => {
  return new Date().toISOString().substr(0, 10);
};

export function Add() {
  // Fields values
  const [date, setDate] = useState(getCurrentDate());
  const [time, setTime] = useState(getCurrentTime());

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [length, setLength] = useState("");
  const [duration, setDuration] = useState("");

  // Functionnal states
  const [moreOptionsOpened, setMoreOptionsOpened] = useState(false);
  const [fromInputFocused, setFromInputFocused] = useState(false);
  const [toInputFocused, setToInputFocused] = useState(false);

  // Error states
  const [errorVisible, setErrorVisible] = useState(false);

  const defaultOtherOptions: OtherOptionsT = {
    roadTypes: [],
    trafficDensities: [],
    weatherTypes: [],
    roundTrip: false,
  };

  const [otherOptState, setOtherOptState] = useState(defaultOtherOptions);

  const handleSubmit = () => {
    if (!getFirebaseAuth().currentUser?.emailVerified) {
      alert("Please verify your email before adding a trip");
      return;
    }

    addTrip({
      date: date,
      time: time,
      roadType: JSON.stringify(otherOptState.roadTypes),
      trafficDensity: JSON.stringify(otherOptState.trafficDensities),
      weather: JSON.stringify(otherOptState.weatherTypes),
      from: from,
      to: to,
      length: parseInt(length),
      duration: parseInt(duration),
      roundTrip: otherOptState.roundTrip,
      uid: getFirebaseAuth().currentUser?.uid as string,
    });
  };

  const allFieldsFilled = (): boolean => {
    if (date === "" || !date) return false;
    if (time === "" || !time) return false;
    if (from === "" || !from) return false;
    if (to === "" || !to) return false;
    if (parseInt(length) <= 0 || length === "" || !length) return false;
    if (parseInt(duration) <= 0 || duration === "" || !duration) return false;
    if (typeof otherOptState.roundTrip !== "boolean") return false;
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
        .then((value) => value.json())
        .then((json) => {
          console.log(json);

          if ("weather" in json) {
            const w = json.weather[0].main;

            if (Weather.includes(w)) {
              console.log(Weather.findIndex((elem) => elem === w));
              setOtherOptState((prevState) => ({
                ...prevState,
                weatherTypes: [0],
              }));
            } else if (w === "Clear") {
              setOtherOptState((prevState) => ({
                ...prevState,
                weatherTypes: [2],
              }));
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
    <PageLayout title={t("addpage.title")}>
      <Notification
        visible={errorVisible}
        setVisible={setErrorVisible}
        type="error"
        content="Veuillez remplir tous les champs"
      />

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Date and time inputs */}

        <section className="grid grid-flow-col-dense gap-4">
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
        </section>

        {/* From and destination inputs */}

        <section>
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
        </section>

        {/* Length and duration inputs */}

        <section className="grid grid-cols-2 gap-4">
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
        </section>

        <MoreOptBtn
          isOpened={moreOptionsOpened}
          setOpened={(val) => setMoreOptionsOpened(val)}
        />

        <OtherOptions
          isOpened={moreOptionsOpened}
          otherOptState={otherOptState}
          setOtherOptState={setOtherOptState}
        />

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
    </PageLayout>
  );
}
