import { useEffect, useState } from "react";

import { BackButton, Cta, PageLayout, Text } from "components";
import { Input, CitySuggestions, Checkbox } from "components/form";
import { OtherOptions } from "./components";
import type { OtherOptionsT } from "./components";
import { toast } from "react-toastify";

import { addTrip } from "../../../lib/functions";
import { Weather } from "../../../types";
import { useTranslation } from "react-i18next";
import { CurrentUser } from "api";
import { useNavigate } from "react-router-dom";

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
  const [addTripPending, setAddTripPending] = useState(true);

  const handleSubmit = async () => {
    if (!CurrentUser.isEmailVerified()) {
      toast("Please verify your email before adding a trip", {
        type: "warning",
      });
      return;
    }

    setAddTripPending(true);

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

  const allFieldsFilled = (): boolean => {
    if (date === "" || !date) return false;
    if (time === "" || !time) return false;
    if (from === "" || !from) return false;
    if (to === "" || !to) return false;
    if (parseInt(length) <= 0 || length === "" || !length) return false;
    if (parseInt(duration) <= 0 || duration === "" || !duration) return false;
    if (typeof roundTrip !== "boolean") return false;
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
    <PageLayout>
      <BackButton onClick={() => navigate("/")} />
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
        ></div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 ? (
          <>
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
                placeholder={
                  t("addpage.inputs.placeholders.from") satisfies string
                }
                onChange={(event) => setFrom(event.target.value)}
                onFocus={() => setFromInputFocused(true)}
                onBlur={() => setFromInputFocused(false)}
                required
              >
                <CitySuggestions
                  location={from}
                  onChange={(value) => {
                    setFrom(value);
                  }}
                  shown={fromInputFocused && from.length >= 3}
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
                  location={to}
                  onChange={(value) => {
                    setTo(value);
                  }}
                  shown={toInputFocused && to.length >= 3}
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
          className="mt-8 sticky bottom-32 shadow-2xl shadow-brand-200/70 dark:shadow-grayblue-900 lg:bottom-8"
          // disabled={!allFieldsFilled()}
          loading={addTripPending}
          onClick={() => {
            if (allFieldsFilled()) {
              if (step === 1) {
                setStep(2);
                return;
              }
              setStep("submitted");
              handleSubmit();
              return;
            }
            toast("Please fill all fields", { type: "error" });
          }}
        >
          {step === 1 ? "Suivant" : "Add trip"}
        </Cta>
      </form>
    </PageLayout>
  );
}
