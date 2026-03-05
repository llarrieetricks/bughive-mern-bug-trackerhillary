import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-7xl mb-6">🐛</div>
          <h1 className="text-5xl font-extrabold mb-4">BugHive</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            A modern, collaborative bug tracking system. Report, track, and resolve issues faster than ever.
          </p>
          {user ? (
            <Link to="/dashboard" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg shadow-lg">
              Go to Dashboard →
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg shadow-lg">
                Get Started Free
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors text-lg">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          Everything you need to squash bugs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🎯', title: 'Priority Levels', desc: 'Categorize bugs by Low, Medium, High, and Critical priority to focus on what matters.' },
            { icon: '📊', title: 'Status Tracking', desc: 'Track bugs through Open, In Progress, and Closed stages with ease.' },
            { icon: '💬', title: 'Comments System', desc: 'Collaborate with your team through threaded comments on every bug.' },
            { icon: '🔒', title: 'Secure Auth', desc: 'JWT-based authentication keeps your project data safe and private.' },
            { icon: '🌙', title: 'Dark Mode', desc: 'Comfortable viewing day or night with automatic theme detection.' },
            { icon: '📱', title: 'Responsive', desc: 'Works perfectly on desktop, tablet, and mobile devices.' },
          ].map((f) => (
            <div key={f.title} className="card text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
