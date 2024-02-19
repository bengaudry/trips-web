import { useEffect, useState } from "react";

import { Cta, PageLayout, Text } from "@/components";
import { Checkbox, CitySuggestions, Input } from "@/components/form";
import { toast } from "react-toastify";
import type { OtherOptionsT } from "./components";
import { OtherOptions } from "./components";

import { CurrentUser } from "@/api";
import { addTrip, sortByOccurencesNumber } from "@/lib/functions";
import { Weather } from "@/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SortMostUsedDestinations } from "@/lib/functions/sortDestinations";

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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState<0 | 1 | 2 | "submitted">(0);

  useEffect(() => {
    if (step === 0) {
      setStep(1);
    }
  }, []);

  // Fields values
  const [date, setDate] = useState(getCurrentDate());
  const [time, setTime] = useState(getCurrentTime());

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [length, setLength] = useState("");
  const [duration, setDuration] = useState("");

  const [roundTrip, setRoundTrip] = useState(false);

  // Functionnal states
  const [fromInputFocused, setFromInputFocused] = useState(false);
  const [toInputFocused, setToInputFocused] = useState(false);

  const defaultOtherOptions: OtherOptionsT = {
    roadTypes: [],
    trafficDensities: [],
    weatherTypes: [],
  };

  const [otherOptState, setOtherOptState] = useState(defaultOtherOptions);
  const [addTripPending, setAddTripPending] = useState(false);

  const handleSubmit = async () => {
    if (checkFieldsValue()) {
      if (step === 1) {
        setStep(2);
        return;
      }
      setStep("submitted");
      handleAddTrip();
      return;
    }
    toast("Please fill all fields", { type: "error" });
  };

  const handleAddTrip = () => {
    setAddTripPending(true);

    if (!CurrentUser.isEmailVerified()) {
      toast("Please verify your email before adding a trip", {
        type: "warning",
      });
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
      roundTrip: roundTrip,
      uid: CurrentUser.getUid() as string,
    }).then(() => {
      setAddTripPending(false);
      navigate("/");
    });
  };

  const checkFieldsValue = (): boolean => {
    if (date === "" || !date) return false;
    if (time === "" || !time) return false;
    if (from === "" || !from) return false;
    if (to === "" || !to) return false;
    if (
      to.toLowerCase().replaceAll(" ", "-") ===
      from.toLowerCase().replaceAll(" ", "-")
    )
      return false;
    if (parseInt(length) <= 0 || length === "" || !length) return false;
    if (parseInt(duration) <= 0 || duration === "" || !duration) return false;
    if (typeof roundTrip !== "boolean") return false;
    return true;
  };

  const fetchWeather = (city: string) => {
    /* Fetches weather from open weather map api for a given city */

    if (city.length >= 2) {
      const OWM_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city
          .toLowerCase()
          .replaceAll(" ", "-")}&appid=${OWM_API_KEY}`
      )
        .then((value) => value.json())
        .then((json) => {
          if ("weather" in json) {
            const w = json.weather[0].main;

            // Associates the result with the known possible weather conditions
            // stored in const Weather
            if (Weather.includes(w)) {
              setOtherOptState((prevState) => ({
                ...prevState,
                weatherTypes: [Weather.findIndex((elem) => elem === w)],
              }));
            } else if (w === "Clear") {
              // Replaces "Clear" weather with "Sun" weather as it is in const Weather
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
          if (document.location.href.includes("localhost")) {
            console.error(`[api weather] : ${err}`);
          }
        });
    }
  };

  return (
    <PageLayout key="add">
      <Text.Title className="mb-3">{t("addpage.title")}</Text.Title>

      <div className="relative bg-gray-200 dark:bg-grayblue-800 h-2 w-full rounded-lg overflow-hidden">
        <div
          className={`${
            step === 1
              ? "scale-x-[.33]"
              : step === 2
              ? "scale-x-[.66]"
              : step === "submitted"
              ? "scale-x-[1]"
              : "scale-x-0"
          } w-full transition-transform translate-x-0 origin-left duration-500 h-full bg-gradient-to-r from-brand-600 to-brand-300 rounded-lg`}
        />
      </div>

      {addTripPending}

      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 ? (
          <>
            {/* Date and time inputs */}

            <section className="grid grid-flow-col-dense gap-4">
              <Input
                name={t("addpage.inputs.labels.date")}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <Input
                name={t("addpage.inputs.labels.time")}
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </section>

            {/* From and destination inputs */}

            <section>
              <Input
                name={t("addpage.inputs.labels.from")}
                type="text"
                value={from}
                placeholder={
                  t("addpage.inputs.placeholders.from") satisfies string
                }
                onChange={(event) => setFrom(event.target.value)}
                onFocus={() => setFromInputFocused(true)}
                onBlur={() => setFromInputFocused(false)}
                required
              >
                <CitySuggestions
                  searchInput={from}
                  onChange={(value) => {
                    setFrom(value);
                  }}
                  shown={fromInputFocused}
                />
              </Input>
              <Input
                name={t("addpage.inputs.labels.to")}
                type="text"
                value={to}
                placeholder={
                  t("addpage.inputs.placeholders.to") satisfies string
                }
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
                <CitySuggestions
                  searchInput={to}
                  onChange={(value) => {
                    setTo(value);
                  }}
                  shown={toInputFocused}
                />
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
            <Checkbox
              name={t("addpage.inputs.labels.roundtrip")}
              checked={roundTrip}
              setChecked={(val) => setRoundTrip(val)}
            />
          </>
        ) : (
          <OtherOptions
            otherOptState={otherOptState}
            setOtherOptState={setOtherOptState}
          />
        )}
        <Cta
          type="button"
          btnType="submit"
          className="mt-8 sticky bottom-6 lg:bottom-8"
          disabled={!checkFieldsValue()}
          loading={addTripPending}
          onClick={handleSubmit}
        >
          {step === 1 ? "Suivant" : "Add trip"}
        </Cta>
      </form>
    </PageLayout>
  );
}
