import { NavLink } from "react-router-dom";

export function NavBarElement(props: {icon: string, label: string, to: string}) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        `${
          isActive ? "text-white" : "text-slate-400"
        } flex flex-col items-center transition-colors duration-200`
      }
    >
      <i className={`fi fi-rr-${props.icon} text-3xl`}></i>
      <span>{props.label}</span>
    </NavLink>
  );
}
