import { useEffect, useState } from "react";

export function RoundedLoader(props: { percent: number }) {
  const [strokeDasharray, setStrokeDasharray] = useState("0 100");
  const [strokeDashoffset, setStrokeDashoffset] = useState("0");

  let { percent } = props;
  const radius = 45;

  const circumference = 2 * Math.PI * radius; // Circonférence du cercle

  useEffect(() => {
    if (percent < 0) {
      percent = 0;
    }

    if (percent > 100) {
      percent = 100;
    }

    const offset = 315 - (315 / 100) * percent;
    setStrokeDashoffset(`${offset}`);
  }, [props.percent]);

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2ed8a7" />
        <stop offset="100%" stop-color="#a6ceff" />
      </linearGradient>
      <circle
        stroke-linecap="round"
        cx="50"
        cy="50"
        r="46"
        stroke-width="8"
        stroke="#404040"
        fill="none"
        stroke-dasharray="315"
      />
      <circle
        stroke-linecap="round"
        cx="50"
        cy="50"
        r="46"
        stroke="url(#linear)"
        stroke-width="8"
        fill="none"
        stroke-dasharray="315"
        stroke-dashoffset={strokeDashoffset}
        stroke-mitterlimit="0"
        transform="rotate(-90 ) translate(-100 0)"
      />
    </svg>
  );
}
