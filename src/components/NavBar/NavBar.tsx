import { NavLink } from "react-router-dom";
import { NavBarElement } from "./components/NavLink";

export function NavBar() {
  return (
    <nav className="fixed bottom-0 w-full bg-slate-800 py-3 pb-8 border-t border-slate-600">
      <ul className="flex flex-row items-center justify-between px-10 h-full">
        <NavBarElement icon="home" label="Home" to="/" />
        <NavBarElement icon="list" label="Trips" to="/trips" />
        <NavBarElement icon="add" label="Add" to="/add" />
        <NavBarElement icon="user" label="Profile" to="/profile" />
      </ul>
    </nav>
  );
}
