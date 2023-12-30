import { useEffect, useState } from "react";
import { strTruish } from "@/lib/functions";

function Location(props: { value: string; onClick?: () => void }) {
  return (
    <button
      className="block text-left px-4 py-0.5 text-neutral-500 dark:text-grayblue-400 transition-colors duration-100 md:hover:bg-gray-100 dark:md:hover:bg-grayblue-700 dark:md:hover:text-white"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export function CitySuggestions(props: {
  location: string;
  onChange: (val: string) => void;
  shown?: boolean;
  className?: string;
}) {
  const [citySuggestions, setCitySuggestions] = useState([]);

  const fetchCitySuggestions = async () => {
    if (!strTruish(props.location)) return;

    const url = `https://api-adresse.data.gouv.fr/search/?q=${props.location}&limit=5&type=municipality`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      setCitySuggestions(JSON.parse(result).features);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (props.location.length >= 3) {
      fetchCitySuggestions();
    }
  }, [props.location]);

  return (
    <div
      className={`${
        props.className
      } absolute z-30 top-full left-0 w-full h-max pt-2 ${
        props.shown
          ? "opacity-1 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white dark:bg-grayblue-800 border border-grayblue-600 rounded-lg py-2 flex flex-col max-h-44 overflow-y-scroll">
        {props.location.length < 3 ? (
          <>
            <span className="px-4 font-semibold mt-2">Nearby</span>
            <span className="px-4 font-semibold mt-2">Recent</span>
            <span
              className="block px-4 py-0.5 text-grayblue-400 transition-colors duration-100 md:hover:bg-gray-100 dark:md:hover:bg-grayblue-700 md:hover:text-white"
              onClick={() => {
                props.onChange("Feurs");
              }}
            >
              Feurs
            </span>
          </>
        ) : (
          <>
            <span className="px-4 font-semibold">Based on your search</span>
            {citySuggestions.map((city: { properties: { label: string } }) => {
              const name = city.properties.label;
              return (
                <Location value={name} onClick={() => props.onChange(name)} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
