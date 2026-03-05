import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBugs, deleteBug } from '../services/api'
import BugCard from '../components/BugCard'

const PRIORITIES = ['All', 'Low', 'Medium', 'High', 'Critical']
const STATUSES   = ['All', 'Open', 'In Progress', 'Closed']

export default function Dashboard() {
  const [bugs, setBugs]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [priority, setPriority] = useState('All')
  const [status, setStatus]     = useState('All')
  const [search, setSearch]     = useState('')

  const fetchBugs = async () => {
    try {
      setLoading(true)
      const params = {}
      if (priority !== 'All') params.priority = priority
      if (status   !== 'All') params.status   = status
      const res = await getBugs(params)
      setBugs(res.data)
    } catch {
      setError('Failed to load bugs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBugs() }, [priority, status])

  const filtered = bugs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Bug Dashboard</h1>
        <Link to="/bugs/new" className="btn-primary">+ New Bug</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total',       value: bugs.length,                                          color: 'text-blue-600'  },
          { label: 'Open',        value: bugs.filter(b => b.status === 'Open').length,          color: 'text-yellow-600'},
          { label: 'In Progress', value: bugs.filter(b => b.status === 'In Progress').length,   color: 'text-purple-600'},
          { label: 'Closed',      value: bugs.filter(b => b.status === 'Closed').length,        color: 'text-green-600' },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search bugs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field flex-1"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input-field sm:w-40">
          {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field sm:w-40">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Bug list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : error ? (
        <p className="text-red-600 text-center py-10">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-5xl mb-4">🎉</p>
          <p className="text-lg font-medium">No bugs found!</p>
          <p className="text-sm mt-1">Try adjusting your filters or <Link to="/bugs/new" className="text-blue-600 hover:underline">report a new bug</Link>.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((bug) => <BugCard key={bug._id} bug={bug} />)}
        </div>
      )}
    </div>
  )
}
