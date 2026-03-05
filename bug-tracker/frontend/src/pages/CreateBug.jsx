import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBug } from '../services/api'

export default function CreateBug() {
  const [form, setForm]       = useState({ title: '', description: '', priority: 'medium', status: 'open' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const navigate              = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await createBug(form)
      navigate(`/bugs/${res.data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create bug.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Report a Bug</h1>

      <div className="card">
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
            <input
              type="text" name="title" required
              value={form.title} onChange={handleChange}
              className="input-field"
              placeholder="Brief description of the bug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
            <textarea
              name="description" required rows={5}
              value={form.description} onChange={handleChange}
              className="input-field resize-none"
              placeholder="Steps to reproduce, expected vs actual behaviour, environment…"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="input-field">
                {[['low','Low'],['medium','Medium'],['high','High'],['critical','Critical']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="input-field">
                {[['open','Open'],['in-progress','In Progress'],['closed','Closed']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Submitting…' : 'Submit Bug'}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
