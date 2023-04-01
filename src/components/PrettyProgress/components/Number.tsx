export function Number(props: {
  children: string;
  active?: boolean;
  isActivating?: boolean;
}) {
  return (
    <span
      className={`${
        props.active
          ? "bg-brand-500 border-brand-500 text-grayblue-900"
          : props.isActivating
          ? "bg-grayblue-800 border-brand-500 text-white"
          : "bg-grayblue-800 border-grayblue-500 text-white"
      } grid place-content-center place-items-center w-9 aspect-square text-center rounded-full font-semibold border-2`}
    >
      {props.children}
    </span>
  );
}
