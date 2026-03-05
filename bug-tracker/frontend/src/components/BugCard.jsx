import { Link } from 'react-router-dom'

const PRIORITY_STYLES = {
  low:      'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  medium:   'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  high:     'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  critical: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
}

const STATUS_STYLES = {
  open:        'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'in progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  closed:      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
}

export default function BugCard({ bug }) {
  const priorityLower = bug.priority?.toLowerCase() || 'low'
  const statusLower   = bug.status?.toLowerCase() || 'open'

  return (
    <Link to={`/bugs/${bug._id}`} className="block card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 flex-1">
          {bug.title}
        </h3>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[priorityLower]}`}>
          {bug.priority}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {bug.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[statusLower]}`}>
          {bug.status}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(bug.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  )
}
