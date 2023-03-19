export function Setting(props: { color: string, icon: string, name: string, onClick?: CallableFunction }) {
  return (
    <div className="flex flex-row items-center justify-between py-3" onClick={() => props.onClick ? props.onClick() : ""}>
      <div className="flex flex-row items-center gap-4">
        <div className={`h-12 aspect-square rounded-full bg-${props.color}-300/40 flex flex-row items-center justify-center`}>
          <i className={`fi fi-rr-${props.icon} text-2xl text-${props.color}-300 translate-y-0.5`}></i>
        </div>
        <div className="flex flex-col">
          <p className="text-xl">{props.name}</p>
        </div>
      </div>
      <div className="h-12 aspect-square rounded-2xl bg-neutral-800 flex flex-roww items-center justify-center">
        <i className="fi fi-rr-angle-right text-neutral-400 translate-y-0.5"></i>
      </div>
    </div>
  );
}
