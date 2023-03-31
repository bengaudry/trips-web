import { useState } from "react";
import { Input, Select, Checkbox, Suggestions } from "../../components/form";
import { Cta } from "../../components";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseApp } from "../../../server";
import { Trip } from "../../types/types";

async function addTrip(content: Trip) {
  const db = getFirestore(getFirebaseApp());
  const tripsCollection = collection(db, "/trips");

  await addDoc(tripsCollection, content).catch((err) => {
    console.log("Firebase error :", err);
    alert("Error while sending to the database, please contact us");
  });

  window.location.href = "/";
}

export function Add() {
  // Fields values
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [roadType, setRoadType] = useState<string>("");
  const [trafficDensity, setTrafficDensity] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [length, setLength] = useState<string>("0");
  const [duration, setDuration] = useState<string>("0");
  const [roundTrip, setRoundTrip] = useState<boolean>(false);

  // Functionnal states
  const [moreOptionsOpened, setMoreOptionsOpened] = useState<boolean>(false);
  const [fromInputFocused, setFromInputFocused] = useState<boolean>(false);
  const [toInputFocused, setToInputFocused] = useState<boolean>(false);

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLength(e.target.value)
          }
          required
        />
        <Input
          name="duration"
          type="number"
          value={duration}
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
              name: "Rainy",
            },
            {
              name: "Windy",
            },
            {
              name: "Foggy",
            },
            {
              name: "Snowy",
            },
            {
              name: "Cloudy",
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
        className="mt-4 sticky bottom-32 shadow-grayblue-900 shadow-2xl"
        onClick={() => {
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
        }}
      >
        Add trip
      </Cta>
    </div>
  );
}
