export function StatPill(props: { label: string; nb: number }) {
  return (
    <div className="w-full flex flex-col items-center px-4 py-2 rounded-lg bg-neutral-200 dark:bg-grayblue-800">
      <span className="font-semibold text-grayblue-500">{props.label}</span>
      <span className="text-3xl font-bold">{props.nb}</span>
    </div>
  );
}
