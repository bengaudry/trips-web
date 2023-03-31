export function Checkbox(props: {
  checked: boolean;
  setChecked: CallableFunction;
}) {
  return (
    <div
      className="flex flex-row items-center justify-between my-4 py-1 px-3 w-full border-2 rounded-lg border-neutral-700"
      onClick={() => props.setChecked(!props.checked)}
    >
      <label
        htmlFor="round-trip"
        className={`${
          props.checked ? "text-white" : "text-neutral-500"
        } font-semibold transition-colors duration-300 pointer-events-none`}
      >
        Round trip
      </label>
      <label className="block pointer-events-none">
        <div
          className={`h-6 rounded-full w-12 transition-colors duration-300 relative ${
            props.checked ? "bg-violet-600" : "bg-neutral-700"
          }`}
        >
          <div
            className={`absolute h-full aspect-square bg-white rounded-full scale-75 transition-transform duration-300 ${
              props.checked ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>
        </div>
        <input
          type="checkbox"
          id="round-trip"
          onChange={(e) => {
            props.setChecked(e.target.checked);
          }}
          checked={props.checked}
          className="hidden"
        />
      </label>
    </div>
  );
}
