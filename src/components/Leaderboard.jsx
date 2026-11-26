import { useState } from 'react'

// Placeholder data until the backend exists
const players = [
  ['magnus_fan', 2310, 812], ['pawnstorm', 1985, 430], ['kubeknight', 1520, 214], ['rookie99', 1102, 57],
  ['e4enjoyer', 1755, 391], ['sicilian_sam', 1810, 502], ['queen_gambit', 2105, 640], ['endgame_eli', 1640, 288],
  ['castle_carl', 1495, 175], ['fork_master', 1580, 330], ['blunder_bob', 980, 120], ['bishop_beth', 1465, 199],
  ['check_mate', 1910, 455], ['zugzwang', 2040, 701], ['tempo_tom', 1545, 260], ['opening_olga', 1610, 344],
  ['knightrider', 1430, 150], ['pinned_pete', 1505, 222], ['gm_hopeful', 2205, 905], ['draw_offer', 1390, 98],
  ['stalemate_sue', 1530, 241], ['rook_lift', 1700, 377], ['pawn_pusher', 1250, 83], ['en_passant', 1565, 270],
]

const ranked = players
  .map(([name, rating, games]) => ({ name, rating, games }))
  .sort((a, b) => b.rating - a.rating)
  .map((p, i) => ({ ...p, rank: i + 1 }))

function Table({ rows, user }) {
  return (
    <table className="w-full text-sm">
      <thead className="text-left text-neutral-400">
        <tr className="border-b border-neutral-800">
          <th className="px-4 py-2 w-16">#</th>
          <th className="px-4 py-2">Player</th>
          <th className="px-4 py-2 text-right">Rating</th>
          <th className="hidden px-4 py-2 text-right sm:table-cell">Games</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-800">
        {rows.length === 0 && (
          <tr><td colSpan={4} className="px-4 py-8 text-center text-neutral-400">No players found</td></tr>
        )}
        {rows.map((p) => (
          <tr key={p.name} className={p.name === user?.name ? 'bg-emerald-500/10 font-semibold' : ''}>
            <td className="px-4 py-3 text-neutral-400">{p.rank}</td>
            <td className="px-4 py-3">{p.name}{p.name === user?.name && <span className="ml-2 text-xs text-emerald-400">(you)</span>}</td>
            <td className="px-4 py-3 text-right font-mono">{p.rating}</td>
            <td className="hidden px-4 py-3 text-right text-neutral-400 sm:table-cell">{p.games}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Leaderboard({ user, onLogin }) {
  const [tab, setTab] = useState('top')
  const [query, setQuery] = useState('')
  const search = (rows) => rows.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
  const me = ranked.findIndex((p) => p.name === user?.name)
  // 5 players above and below you
  const near = ranked.slice(Math.max(0, me - 5), me + 6)

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Leaderboard</h1>

      <div className="mt-6 flex items-end justify-between gap-4 border-b border-neutral-800">
        <div className="flex gap-2">
          {[['top', 'Top players'], ['near', 'Near me']].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm ${tab === id ? 'border-emerald-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search players…"
          aria-label="Search players"
          className="-mb-px w-40 border-b-2 border-transparent bg-transparent px-2 py-2 text-sm text-white placeholder-neutral-400 hover:placeholder-white focus:border-emerald-500 focus:outline-none sm:w-56"
        />
      </div>

      <div className="mt-4 rounded-lg border border-neutral-800">
        {tab === 'top' && <Table rows={search(ranked)} user={user} />}
        {tab === 'near' && user && <Table rows={search(near)} user={user} />}
        {tab === 'near' && !user && (
          <div className="px-4 py-16 text-center">
            <p className="text-lg font-semibold">See players close to your rating</p>
            <p className="mt-2 text-sm text-neutral-400">Log in or create an account to see where you rank.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={onLogin} className="rounded-md border border-neutral-700 px-4 py-2 hover:border-neutral-500">Log in</button>
              <button onClick={onLogin} className="rounded-md bg-emerald-600 px-4 py-2 font-medium hover:bg-emerald-500">Create account</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
