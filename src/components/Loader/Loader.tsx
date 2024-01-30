import { useState, useEffect } from "react";

export function Loader() {
  const [warningVisible, setWarningVisible] = useState(false);

  useEffect(() => {
    window.setTimeout(() => {
      setWarningVisible(true);
    }, 3000);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-neutral-100 dark:bg-black z-[70] flex flex-col justify-between items-center py-32">
      <div />
      <div className="flex flex-col items-center gap-2 text-center">
        <i className="fi fi-rr-loading loader text-grayblue-100"></i>
        <p>Loading...</p>
      </div>

      <div
        className={`grid place-content-center gap-2 px-6 max-w-xs text-center transition-opacity ${
          warningVisible ? "opacity-1" : "opacity-0"
        }`}
      >
        <p className="text-neutral-400">
          The loading seems stuck. Try refreshing the app.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-brand-500 text-grayblue-100 px-6 py-1 rounded-full mx-auto"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
