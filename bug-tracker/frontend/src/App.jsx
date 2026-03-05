import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home        from './pages/Home'
import Dashboard   from './pages/Dashboard'
import Login       from './pages/Login'
import Register    from './pages/Register'
import CreateBug   from './pages/CreateBug'
import BugDetails  from './pages/BugDetails'
import NotFound    from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main>
              <Routes>
                <Route path="/"          element={<Home />} />
                <Route path="/login"     element={<Login />} />
                <Route path="/register"  element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/bugs/new"  element={<ProtectedRoute><CreateBug /></ProtectedRoute>} />
                <Route path="/bugs/:id"  element={<ProtectedRoute><BugDetails /></ProtectedRoute>} />
                <Route path="*"          element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
