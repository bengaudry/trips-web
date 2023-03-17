import { useState } from "react";
import { Input, Select } from "../../components/Forms";

export function Add() {
  const [roadType, setRoadType] = useState<string>("");
  const [trafficDensity, setTrafficDensity] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [moreOptionsOpened, setMoreOptionsOpened] = useState<boolean>(false);
  return (
    <div className="px-5 py-16 pb-96">
      <form onSubmit={(e) => e.preventDefault()}></form>
      <h1 className="text-4xl font-semibold">Add a trip</h1>
      <div className="grid grid-flow-col-dense gap-4">
        <Input name="Date" type="date" />
        <Input name="Time" type="time" />
      </div>
      <Input name="from" type="text" />
      <Input name="to" type="text" />
      <div className="grid grid-cols-2 gap-4">
        <Input name="length" type="number" />
        <Input name="duration" type="number" />
      </div>
      <button
        onClick={() => setMoreOptionsOpened(!moreOptionsOpened)}
        className="mt-4"
      >
        <span>
          See{" "}
          <span className="inline-block w-9">
            {moreOptionsOpened ? "less" : "more"}
          </span>{" "}
          options{" "}
          <i
            className={`fi fi-rr-angle-small-down inline-block transition-transform duration-300 ${
              moreOptionsOpened ? "rotate-180" : "rotate-0"
            }`}
          ></i>
        </span>
      </button>
      <div
        className={`${
          moreOptionsOpened ? "h-full" : "scale-y-0"
        } transition-transform origin-top duration-300`}
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
      </div>
    </div>
  );
}
