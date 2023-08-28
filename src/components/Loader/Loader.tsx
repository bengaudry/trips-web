import { useState, useEffect } from "react";

export function Loader() {
  const [warningVisible, setWarningVisible] = useState(false);

  useEffect(() => {
    window.setTimeout(() => {
      setWarningVisible(true);
    }, 5000);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-neutral-100 dark:bg-black z-[70] grid place-content-center">
      <i className="fi fi-rr-loading loader text-white"></i>
      <p className="-translate-x-2">Loading...</p>
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 place-content-center gap-2 ${
          warningVisible ? "grid" : "hidden"
        }`}
      >
        <p className="text-neutral-400">
          The loading seems stuck. Try refreshing the app.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-brand-500 px-6 py-1 rounded-full mx-auto"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
