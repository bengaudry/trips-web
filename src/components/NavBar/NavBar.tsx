export function NavBar() {
  return <nav className="fixed bottom-0 w-full bg-stone-800 h-max py-4">
    <ul className="flex flex-row items-center justify-evenly h-full">
      <li><i className="fi fi-rr-home text-3xl"></i></li>
      <li><i className="fi fi-rr-list text-3xl"></i></li>
      <li><i className="fi fi-rr-add text-3xl"></i></li>
      <li><i className="fi fi-rr-user text-3xl"></i></li>
    </ul>
  </nav>
}