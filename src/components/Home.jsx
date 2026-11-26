import { useState } from 'react'

const timeControls = [
  { name: 'Blitz', time: '3+2', rule: '3 min each, +2 sec per move' },
  { name: 'Classical', time: '30+0', rule: '30 min each, no bonus time' },
]

// Placeholder data until the backend exists
const recentGames = [
  { white: 'magnus_fan', black: 'pawnstorm', result: '1-0', tc: '3+2' },
  { white: 'kubeknight', black: 'rookie99', result: '½-½', tc: '30+0' },
  { white: 'e4enjoyer', black: 'sicilian_sam', result: '0-1', tc: '3+2' },
]

const backRank = '♜♞♝♛♚♝♞♜'
const startPosition = [
  [...backRank], Array(8).fill('♟'), ...Array(4).fill(Array(8).fill('')),
  Array(8).fill('♙'), [...'♖♘♗♕♔♗♘♖'],
]

function Board() {
  return (
    <div className="grid aspect-square w-full max-w-md grid-cols-8 grid-rows-8 overflow-hidden rounded-lg shadow-2xl">
      {startPosition.flatMap((row, r) =>
        row.map((piece, c) => (
          <div
            key={`${r}${c}`}
            className={`flex items-center justify-center text-3xl sm:text-4xl text-neutral-900 ${(r + c) % 2 ? 'bg-emerald-800' : 'bg-emerald-100'}`}
          >
            {piece}
          </div>
        )),
      )}
    </div>
  )
}

export default function Home() {
  const [selected, setSelected] = useState(timeControls[0].time)
  const [queued, setQueued] = useState(false)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">Find your next opponent.</h1>
          <p className="mt-4 text-neutral-400">
            Pick a time control and jump into the queue. We'll match you with a player of similar rating.
          </p>

          <div id="play" className="mt-8 grid grid-cols-2 gap-3">
            {timeControls.map((tc) => (
              <button
                key={tc.time}
                onClick={() => setSelected(tc.time)}
                disabled={queued}
                className={`rounded-lg border px-3 py-3 text-center transition ${
                  selected === tc.time ? 'border-emerald-500 bg-emerald-500/10' : 'border-neutral-700 hover:border-neutral-500'
                }`}
              >
                <div className="text-lg font-semibold">{tc.name}</div>
                <div className="font-mono text-emerald-400">{tc.time}</div>
                <div className="mt-1 text-xs text-neutral-400">{tc.rule}</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setQueued(!queued)}
            className={`mt-6 w-full rounded-lg py-4 text-lg font-semibold transition ${
              queued ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {queued ? `Searching for ${timeControls.find((tc) => tc.time === selected).name} opponent… (cancel)` : 'Play now'}
          </button>

          <div className="mt-6 flex gap-8 text-sm text-neutral-400">
            <div><span className="text-xl font-bold text-white">1,204</span> players online</div>
            <div><span className="text-xl font-bold text-white">318</span> games in progress</div>
          </div>
        </div>

        <div className="flex justify-center"><Board /></div>
      </section>

      <section id="watch" className="mt-16">
        <h2 className="mb-4 text-xl font-semibold">Recent games</h2>
        <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800">
          {recentGames.map((g, i) => (
            <li key={i} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{g.white} <span className="text-neutral-500">vs</span> {g.black}</span>
              <span className="flex gap-4 text-neutral-400">
                <span>{g.tc}</span>
                <span className="w-8 text-right font-mono text-white">{g.result}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
