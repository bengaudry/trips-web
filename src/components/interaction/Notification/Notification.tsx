import { capitalizeString } from "@/lib/functions";

export function Notification(props: {
  visible: boolean;
  setVisible: (val: boolean) => void;
  content: string;
  type: "success" | "error" | "warn";
}) {
  return (
    <div
      className={`fixed z-50 top-4 right-4 left-4 ${
        props.type === "error"
          ? "bg-red-600/60"
          : props.type === "success"
          ? "bg-green-600/60"
          : "bg-yellow-600/60"
      } backdrop-blur-md w-[calc(100vw-2rem)] max-w-screen-sm sm:right-4 sm:left-auto px-6 py-3 rounded-xl flex flex-row items-center justify-between gap-4 transition-transform duration-500 ${
        props.visible ? "translate-y-0" : "-translate-y-[calc(100%+2rem)]"
      }`}
    >
      <span className="break-words overflow-clip">
        {capitalizeString(
          props.content.replaceAll("auth/", "").replaceAll("-", " ")
        )}
      </span>
      <button onClick={() => props.setVisible(false)}>
        <i className="fi fi-rr-cross"></i>
      </button>
    </div>
  );
}
