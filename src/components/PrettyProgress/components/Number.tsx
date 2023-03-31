export function Number(props: {
  children: string;
  active?: boolean;
  isActivating?: boolean;
}) {
  return (
    <span
      className={`${
        props.active
          ? "bg-violet-500 border-violet-500 text-neutral-900"
          : props.isActivating
          ? "bg-neutral-800 border-violet-500 text-white"
          : "bg-neutral-800 border-neutral-500 text-white"
      } grid place-content-center place-items-center w-9 aspect-square text-center rounded-full font-semibold border-2`}
    >
      {props.children}
    </span>
  );
}
