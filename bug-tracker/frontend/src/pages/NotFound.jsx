import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-center px-4">
      <div>
        <p className="text-8xl font-extrabold text-blue-600 dark:text-blue-400">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Page not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Looks like this bug escaped! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary inline-flex mt-6">Go Home</Link>
      </div>
    </div>
  )
}
