import { useState } from "react";
import { Input, Select, Suggestions } from "../../components/Forms";
import { Cta } from "../../components/Buttons/Cta";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";
import { getFirebaseApp } from "../../../server";

async function addTrip(content: {
  date: string;
  time: string;
  roadType: string;
  trafficDensity: string;
  weather: string;
  from: string;
  to: string;
  length: string;
  duration: string;
  roundTrip: boolean;
  uid: string;
}) {
  const db = getFirestore(getFirebaseApp());
  const tripsCollection = collection(db, "/trips");

  await addDoc(tripsCollection, content)
    .then((result) => console.log(result))
    .catch((err) => {
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
      <h1 className="text-4xl font-semibold">Add a trip</h1>
      <div className="grid grid-flow-col-dense gap-4">
        <Input
          name="Date"
          type="date"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
        />
        <Input
          name="Time"
          type="time"
          value={time}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTime(e.target.value)
          }
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
      >
        {/* <Suggestions
          location={from}
          onChange={(value: string) => {
            console.log(value)
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
        />
        <Input
          name="duration"
          type="number"
          value={duration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDuration(e.target.value)
          }
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
        <div className="flex flex-row items-center gap-2 my-4">
          <label htmlFor="round-trip">Round trip</label>
          <input
            type="checkbox"
            id="round-trip"
            onChange={(e) => {
              setRoundTrip(e.target.checked);
            }}
            checked={roundTrip}
          />
        </div>
      </div>
      <Cta
        func="button"
        btnType="submit"
        className="mt-4 sticky bottom-32 shadow-slate-900 shadow-2xl"
        onClick={() => {
          addTrip({
            date: date,
            time: time,
            roadType: roadType,
            trafficDensity: trafficDensity,
            weather: weather,
            from: from,
            to: to,
            length: length,
            duration: duration,
            roundTrip: roundTrip,
            uid: "xqWqf8Oaf5aOTribODm3AhYi1em2",
          });
        }}
      >
        Add trip
      </Cta>
    </div>
  );
}
