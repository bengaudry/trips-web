export function TabSlider(props: {
  tabs: string[];
  onChange: CallableFunction;
  current: number;
  className?: string;
}) {
  return (
    <div
      className={`grid relative p-1 py-1.5 bg-neutral-200 dark:bg-grayblue-800 rounded-lg overflow-hidden ${props.className}`}
      style={{ gridTemplateColumns: `repeat(${props.tabs.length}, 1fr)` }}
    >
      <div
        className={`absolute left-1 top-1 bg-white dark:bg-grayblue-700 h-[calc(100%-0.5rem)] rounded-md transition-transform duration-300 origin-left shadow-lg inset`}
        style={{
          width: `calc(100% / ${props.tabs.length} - 0.25rem)`,
          transform: `translateX(${props.current * 100}%)`,
        }}
      ></div>
      {props.tabs.map((tab, index) => (
        <div
          className={`text-center w-full z-20`}
          onClick={() => {
            props.onChange(index);
          }}
          key={index}
        >
          <span
            className={`${
              props.current === index
                ? "dark:text-white"
                : "text-neutral-500 dark:text-grayblue-400"
            } transition-colors duration-500`}
          >
            {tab}
          </span>
        </div>
      ))}
    </div>
  );
}
