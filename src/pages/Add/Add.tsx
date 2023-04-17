import { useState } from "react";
import { Input, Select, Checkbox, Suggestions } from "../../components/form";
import { Cta } from "../../components";
import { getFirebaseAuth } from "../../../server";
import { addTrip } from "../../lib/functions";

export function Add() {
  // Fields values
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [roadType, setRoadType] = useState("");
  const [trafficDensity, setTrafficDensity] = useState("");
  const [weather, setWeather] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [length, setLength] = useState("");
  const [duration, setDuration] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);

  // Functionnal states
  const [moreOptionsOpened, setMoreOptionsOpened] = useState(false);
  const [fromInputFocused, setFromInputFocused] = useState(false);
  const [toInputFocused, setToInputFocused] = useState(false);

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

  return (
    <div className="px-5 py-16 pb-44">
      <form onSubmit={(e) => e.preventDefault()}></form>
      <h1 className="text-4xl font-bold">Add a trip</h1>
      <div className="grid grid-flow-col-dense gap-4">
        <Input
          name="Date"
          type="date"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          required
        />
        <Input
          name="Time"
          type="time"
          value={time}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTime(e.target.value)
          }
          required
        />
      </div>
      <Input
        name="from"
        type="text"
        value={from}
        placeholder="A city, an adress, a district, a place..."
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
        name="to"
        type="text"
        value={to}
        placeholder="A city, an adress, a district, a place..."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTo(event.target.value);
        }}
        onFocus={() => setToInputFocused(true)}
        onBlur={() => setToInputFocused(false)}
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
          name="length"
          type="number"
          value={length}
          placeholder="Length in kms"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLength(e.target.value)
          }
          required
        />
        <Input
          name="duration"
          type="number"
          value={duration}
          placeholder="Duration in minutes"
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
          See {moreOptionsOpened ? "less" : "more"} options
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
          name="road-type"
          onChange={(selection: string) => setRoadType(selection)}
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
          name="traffic-density"
          onChange={(selection: string) => setTrafficDensity(selection)}
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
          name="weather"
          onChange={(selection: string) => setWeather(selection)}
          options={[
            {
              name: "Sunny",
            },
            {
              name: "Cloudy",
            },
            {
              name: "Rainy",
            },
            {
              name: "Foggy",
            },
            {
              name: "Windy",
            },
            {
              name: "Snowy",
            },
          ]}
        />
        <Checkbox
          checked={roundTrip}
          setChecked={(val: boolean) => setRoundTrip(val)}
        />
      </div>
      <Cta
        type="button"
        btnType="submit"
        className="mt-4 sticky bottom-32 shadow-grayblue-900 shadow-2xl lg:bottom-8"
        onClick={handleSubmit}
      >
        Add trip
      </Cta>
    </div>
  );
}
