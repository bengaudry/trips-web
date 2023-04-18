export function Description(props: { children: string }) {
  return (
    <span className="uppercase text-xs mt-2 text-grayblue-400 text-center">
      {props.children}
    </span>
  );
}
