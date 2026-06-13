import { useState, useEffect } from 'react'
import { supabase } from './config/supabase'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Pacientes from './pages/Pacientes'
import Repasses from './pages/Repasses'
import './styles/app.css'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setCurrentUser(session?.user || null)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  if (!currentUser) {
    return <div className="login-page">Por favor, faça login no Supabase</div>
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'pacientes':
        return <Pacientes />
      case 'repasses':
        return <Repasses />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app-container">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}
