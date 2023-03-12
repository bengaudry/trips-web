import { Link } from "react-router-dom";

export function NavBar() {
  return <nav className="fixed bottom-0 w-full bg-stone-800 h-max py-4">
    <ul className="flex flex-row items-center justify-evenly h-full">
      <Link to="/"><i className="fi fi-rr-home text-3xl"></i></Link>
      <Link to="/trips"><i className="fi fi-rr-list text-3xl"></i></Link>
      <Link to="/add"><i className="fi fi-rr-add text-3xl"></i></Link>
      <Link to="/profile"><i className="fi fi-rr-user text-3xl"></i></Link>
    </ul>
  </nav>
}
