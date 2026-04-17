import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { isBackendConfigured } from '../services/api'

export default function Navbar() {
  const { user, logoutUser } = useAuth()
  const { dark, toggle }     = useTheme()
  const navigate             = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🐛</span>
            <span className="font-bold text-xl text-blue-600 dark:text-blue-400">BugHive</span>
          </Link>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? '☀️' : '🌙'}
            </button>

            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
                <Link to="/bugs/new" className="btn-primary text-sm py-1.5 px-3">
                  + New Bug
                </Link>
                <span className="text-sm text-gray-500 dark:text-gray-400">Hi, {user.name}</span>
                <button onClick={handleLogout} className="btn-secondary text-sm py-1.5 px-3">
                  Logout
                </button>
              </>
            ) : (
              isBackendConfigured ? (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-sm py-1.5 px-3">
                    Register
                  </Link>
                </>
              ) : (
                <span className="text-xs sm:text-sm font-medium text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/40 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-700">
                  Frontend Preview
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
