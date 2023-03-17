import { NavBarElement } from "./components/NavLink";

export function NavBar() {
  return (
    <nav className="fixed bottom-0 z-30 w-full bg-slate-800 py-3 pb-8 border-t border-slate-600">
      <ul className="flex flex-row items-center justify-between px-10 h-full">
        <NavBarElement icon="apps" label="Home" to="/" />
        <NavBarElement icon="add" label="Add" to="/add" />
        <NavBarElement icon="user" label="Profile" to="/profile" />
      </ul>
    </nav>
  );
}
