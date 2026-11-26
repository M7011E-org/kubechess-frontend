import { useEffect, useState } from 'react'
import Home from './components/Home.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  const [hash, setHash] = useState(location.hash)
  // shortcut: fake login with a demo user, replace when the auth backend exists
  const [user, setUser] = useState(null)
  const login = () => setUser({ name: 'kubeknight' })

  useEffect(() => {
    const onChange = () => setHash(location.hash)
    addEventListener('hashchange', onChange)
    return () => removeEventListener('hashchange', onChange)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <Navbar user={user} onLogin={login} onLogout={() => setUser(null)} />
      {hash === '#leaderboard' ? <Leaderboard user={user} onLogin={login} /> : <Home />}
    </div>
  )
}
