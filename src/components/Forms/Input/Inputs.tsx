interface props {
  name: string;
  className?: string;
  type: "email" | "text" | "password" | "number" | "hidden";
  onClick?: CallableFunction;
  onInput?: CallableFunction;
  onChange?: CallableFunction;
}

function capitalizeString (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Input(props: props) {
  return (<div className="flex flex-col">
    <label htmlFor={props.name} className="mt-4">
      {capitalizeString(props.name)}
    </label>
    <input
      type={props.type}
      id={props.name}
      className={`bg-slate-800 outline-none border-2 border-transparent py-2 px-4 rounded-lg focus:border-emerald-500 ${props.className}`}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
      onInput={(e) => {
        if (props.onInput) props.onInput(e);
      }}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);
      }}
    />
  </div>);
}
