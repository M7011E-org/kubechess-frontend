const links = ['Play', 'Leaderboard', 'About']

export default function Navbar() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl">♞</span> KubeChess
        </a>
        <ul className="hidden gap-6 text-sm text-neutral-300 sm:flex">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="hover:text-white">{l}</a>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 text-sm">
          <button className="rounded-md px-3 py-1.5 text-neutral-300 hover:text-white">Log in</button>
          <button className="rounded-md bg-emerald-600 px-3 py-1.5 font-medium hover:bg-emerald-500">Sign up</button>
        </div>
      </nav>
    </header>
  )
}
