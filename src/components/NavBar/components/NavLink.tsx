import { NavLink } from "react-router-dom";

export function NavBarElement(props: {icon: string, label: string, to: string}) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        `${
          isActive ? "text-white" : "text-grayblue-400"
        } flex flex-col items-center transition-colors duration-200 lg:flex-row lg:w-full lg:items-center lg:gap-4`
      }
    >
      <i className={`fi fi-rr-${props.icon} text-2xl lg:text-lg lg:translate-y-0.5`}></i>
      <span className="text-sm lg:text-lg">{props.label}</span>
    </NavLink>
  );
}
