import { NavLink } from "react-router-dom";

type NotStandaloneAlertProps = {
  shown: boolean;
  setShown: (val: boolean) => void;
};

export function NotStandaloneAlert(props: NotStandaloneAlertProps) {
  return (
    <div
      className={`${
        props.shown ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      } grid w-full transition-[grid-template-rows] duration-500 bg-neutral-200 dark:bg-grayblue-800 overflow-hidden rounded-b-3xl`}
    >
      <main
        className={`overflow-hidden p-6 grid-rows-[1/span2]`}
        style={{ gridRow: "1 / span 2" }}
      >
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-2xl font-semibold">Install the app</h3>
          <button onClick={() => props.setShown(false)}>
            <i className="fi fi-rr-cross text-grayblue-500"></i>
          </button>
        </div>
        <p className="text-grayblue-500 mt-2 mb-4">
          Hmm, looks like you are using Trips on your browser. Trips can be
          installed on your device and it is much more comfortable.
        </p>
        <NavLink to="/install" className="bg-brand-500 px-4 py-1 rounded-full" onClick={() => props.setShown(false)}>
          See how{" "}
          <i className="fi fi-rr-arrow-alt-right inline-block translate-y-1 ml-2"></i>
        </NavLink>
      </main>
    </div>
  );
}
