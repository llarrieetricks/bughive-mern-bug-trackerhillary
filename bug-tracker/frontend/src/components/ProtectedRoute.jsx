import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isBackendConfigured } from '../services/api'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (!isBackendConfigured) {
    return <Navigate to="/" replace />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}
