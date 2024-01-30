import { NavLink } from "react-router-dom";

export function NavBarElement(props: {
  icon: string;
  label: string;
  to: string;
}) {
  return (
    <li className="w-full">
      <NavLink
        to={props.to}
        className={({ isActive }) =>
          `${
            isActive
              ? "text-brand-400 dark:text-grayblue-100 lg:bg-grayblue-700/60"
              : "text-neutral-400 dark:text-grayblue-400 lg:hover:bg-grayblue-700/20"
          } flex flex-col items-center transition-colors duration-200 lg:flex-row lg:w-full lg:items-center lg:gap-4 lg:rounded-xl lg:px-6 lg:py-2`
        }
      >
        <i
          className={`fi fi-rr-${props.icon} text-2xl lg:text-lg lg:translate-y-0.5`}
        ></i>
        <span className="text-sm lg:text-lg">{props.label}</span>
      </NavLink>
    </li>
  );
}
