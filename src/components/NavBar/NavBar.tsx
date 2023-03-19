import { NavBarElement } from "./components/NavLink";

export function NavBar() {
  return (
    <nav className="fixed bottom-0 z-30 w-full bg-neutral-800 py-3 pb-10 border-t border-neutral-600">
      <ul className="flex flex-row items-center justify-between px-16 h-full">
        <NavBarElement icon="apps" label="Home" to="/" />
        <NavBarElement icon="add" label="Add" to="/add" />
        <NavBarElement icon="user" label="Settings" to="/settings" />
      </ul>
    </nav>
  );
}
