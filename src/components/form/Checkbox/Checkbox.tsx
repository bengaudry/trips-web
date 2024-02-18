export function Checkbox(props: {
  checked: boolean;
  setChecked: (val: boolean) => void;
  name: string;
}) {
  return (
    <div
      className="flex flex-row items-center justify-between my-4 py-1 px-3 w-full border-2 rounded-lg dark:border-white/10"
      onClick={() => props.setChecked(!props.checked)}
    >
      <label
        htmlFor="round-trip"
        className={`${
          props.checked
            ? "dark:text-grayblue-100"
            : "text-neutral-400 dark:text-grayblue-500"
        } transition-colors duration-300 pointer-events-none font-medium`}
      >
        {props.name}
      </label>
      <label className="block pointer-events-none">
        <div
          className={`h-6 rounded-full w-12 transition-colors duration-300 relative ${
            props.checked
              ? "bg-brand-400 dark:bg-brand-600"
              : "bg-neutral-300 dark:bg-grayblue-700"
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
