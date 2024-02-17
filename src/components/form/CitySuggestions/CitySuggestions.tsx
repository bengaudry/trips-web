import { useEffect, useState } from "react";
import { strTruish } from "@/lib/functions";
import { Trip } from "@/types";
import { SortMostUsedDestinations } from "@/lib/functions/sortDestinations";

function Location(props: { value: string; onClick?: () => void }) {
  return (
    <button
      className="block w-full text-left px-4 py-0.5 text-neutral-500 dark:text-grayblue-400 transition-colors duration-100 md:hover:bg-gray-100 dark:md:hover:bg-grayblue-700 dark:md:hover:text-grayblue-100"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export function CitySuggestions(props: {
  searchInput: string;
  onChange: (val: string) => void;
  shown?: boolean;
  className?: string;
}) {
  const [cityAutocompletion, setCityAutocompletion] = useState([]);
  const [cityRecentSuggestions, setCityRecentSuggestions] = useState<string[]>(
    []
  );

  const fetchRecentTowns = () => {
    const local = localStorage.getItem("cached-trips-data");

    if (local) {
      const storedTrips: Array<Trip> | undefined = JSON.parse(local);
      if (storedTrips) {
        const sortedDestinations = SortMostUsedDestinations(storedTrips);
        setCityRecentSuggestions(sortedDestinations);
      }
    }
  };

  const fetchCitySuggestions = async () => {
    if (!strTruish(props.searchInput)) return;

    if (props.searchInput.length >= 3) {
      const url = `https://api-adresse.data.gouv.fr/search/?q=${props.searchInput}&limit=5&type=municipality`;
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        setCityAutocompletion(JSON.parse(result).features);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecentTowns();
  };

  useEffect(() => {
    fetchCitySuggestions();
  }, []);

  useEffect(() => {
    fetchCitySuggestions();
  }, [props.searchInput]);

  if (cityRecentSuggestions.length > 0 || cityAutocompletion.length > 0) {
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
          <>
            {props.searchInput.length < 3 ? (
              <>
                <div>
                  <span className="px-4 font-semibold">Recent</span>
                  {cityRecentSuggestions.map((city) => (
                    <Location
                      value={city}
                      onClick={() => props.onChange(city)}
                    />
                  ))}
                </div>
                {/* <span className="px-4 font-semibold mt-2">Nearby</span> */}
              </>
            ) : (
              <div>
                <span className="px-4 font-semibold">Based on your search</span>
                {cityAutocompletion.map(
                  (city: { properties: { label: string } }) => {
                    const name = city.properties.label;
                    return (
                      <Location
                        value={name}
                        onClick={() => props.onChange(name)}
                      />
                    );
                  }
                )}
              </div>
            )}
          </>
        </div>
      </div>
    );
  }

  return <></>;
}
