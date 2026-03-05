import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getBug, updateBug, deleteBug, getComments, addComment, deleteComment } from '../services/api'
import { useAuth } from '../context/AuthContext'

const PRIORITY_STYLES = {
  low:      'bg-green-100 text-green-800',
  medium:   'bg-yellow-100 text-yellow-800',
  high:     'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
}

const STATUS_OPTIONS = [['open','Open'],['in-progress','In Progress'],['closed','Closed']]
const PRIORITY_OPTIONS = [['low','Low'],['medium','Medium'],['high','High'],['critical','Critical']]

export default function BugDetails() {
  const { id }              = useParams()
  const navigate            = useNavigate()
  const { user }            = useAuth()

  const [bug, setBug]               = useState(null)
  const [comments, setComments]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [editing, setEditing]       = useState(false)
  const [editForm, setEditForm]     = useState({})
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const [bugRes, commRes] = await Promise.all([getBug(id), getComments(id)])
        setBug(bugRes.data)
        setEditForm({ title: bugRes.data.title, description: bugRes.data.description, priority: bugRes.data.priority, status: bugRes.data.status })
        setComments(commRes.data)
      } catch {
        setError('Bug not found.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await updateBug(id, editForm)
      setBug(res.data)
      setEditing(false)
    } catch {
      alert('Failed to update bug.')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this bug permanently?')) return
    try {
      await deleteBug(id)
      navigate('/dashboard')
    } catch {
      alert('Failed to delete bug.')
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setSubmitting(true)
    try {
      const res = await addComment(id, { text: commentText })
      setComments((prev) => [...prev, res.data])
      setCommentText('')
    } catch {
      alert('Failed to add comment.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (cId) => {
    if (!window.confirm('Delete this comment?')) return
    try {
      await deleteComment(cId)
      setComments((prev) => prev.filter((c) => c._id !== cId))
    } catch {
      alert('Failed to delete comment.')
    }
  }

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" /></div>
  if (error)   return <p className="text-center py-20 text-red-600">{error}</p>

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Back */}
      <Link to="/dashboard" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">← Back to Dashboard</Link>

      {/* Bug card */}
      <div className="card space-y-4">
        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input required value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="input-field font-semibold text-lg" />
            <textarea required rows={4} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="input-field resize-none" />
            <div className="grid grid-cols-2 gap-4">
              <select value={editForm.priority} onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })} className="input-field">
                {PRIORITY_OPTIONS.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="input-field">
                {STATUS_OPTIONS.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{bug.title}</h1>
              <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[bug.priority?.toLowerCase()]}`}>{bug.priority}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{bug.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Status: <span className="font-medium text-gray-800 dark:text-gray-200">{bug.status}</span></span>
              <span>Created: {new Date(bug.createdAt).toLocaleString()}</span>
              {bug.reportedBy && <span>By: {bug.reportedBy.name || bug.reportedBy}</span>}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setEditing(true)} className="btn-secondary text-sm py-1.5 px-3">Edit</button>
              <button onClick={handleDelete} className="btn-danger text-sm py-1.5 px-3">Delete</button>
            </div>
          </>
        )}
      </div>

      {/* Comments */}
      <div className="card space-y-4">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Comments ({comments.length})</h2>

        {comments.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet. Be the first!</p>
        )}

        {comments.map((c) => (
          <div key={c._id} className="flex gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {(c.author?.name || 'U')[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.author?.name || 'Unknown'}</span>
                <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{c.text}</p>
            </div>
            {(user?._id === c.author?._id || user?.id === c.author?._id) && (
              <button onClick={() => handleDeleteComment(c._id)} className="text-xs text-red-500 hover:text-red-700 shrink-0">Delete</button>
            )}
          </div>
        ))}

        {user && (
          <form onSubmit={handleAddComment} className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment…"
              className="input-field flex-1"
            />
            <button type="submit" disabled={submitting || !commentText.trim()} className="btn-primary shrink-0">
              {submitting ? '…' : 'Post'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
