export function Setting(props: {
  color: string;
  icon: string;
  name: string;
  subTitle?: string;
  onClick?: CallableFunction;
  reduceIconSize?: boolean;
  bigIcon?: boolean;
}) {
  return (
    <div
      className="flex flex-row items-center justify-between py-3"
      onClick={() => (props.onClick ? props.onClick() : "")}
    >
      <div className="flex flex-row items-center gap-4">
        <div
          className={`${
            props.bigIcon ? "h-16" : "h-12"
          } aspect-square rounded-full flex flex-row items-center justify-center`}
          style={{
            backgroundColor: `rgba(${props.color}, 0.4)`,
          }}
        >
          <i
            className={`fi fi-rr-${props.icon} ${
              props.bigIcon ? "text-3xl" : "text-2xl"
            }`}
            style={{
              color: `rgba(${props.color}, 1)`,
              transform: `scale(${
                props.reduceIconSize ? ".8" : "1"
              }) translateY(4px)`,
            }}
          ></i>
        </div>
        <div className="flex flex-col">
          <p className="text-xl cursor-default">{props.name}</p>
          <p className="text-xl text-neutral-500">{props.subTitle}</p>
        </div>
      </div>
      <div className="h-12 aspect-square rounded-2xl bg-neutral-800 flex flex-roww items-center justify-center">
        <i className="fi fi-rr-angle-right text-neutral-400 translate-y-0.5"></i>
      </div>
    </div>
  );
}
