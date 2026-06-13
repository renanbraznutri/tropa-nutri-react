import { BarChart3, Users, DollarSign, Home } from 'lucide-react'
import '../styles/navigation.css'

export default function Navigation({ currentPage, onPageChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'pacientes', label: 'Pacientes', icon: Users },
    { id: 'repasses', label: 'Repasses', icon: DollarSign },
  ]

  return (
    <nav className="navigation">
      <div className="nav-header">
        <div className="nav-logo">
          <BarChart3 size={24} />
          <span>Tropa do Nutri</span>
        </div>
      </div>

      <div className="nav-items">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
