import { motion } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import { Home, LayoutGrid, Users, Settings, LogOut, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import Avatar from '../common/Avatar'
import Dropdown from '../common/Dropdown'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'
import { getLastProjectId } from '../../utils/tokenUtils'

export default function GlobalSidebar() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [rect, setRect] = useState(null)
  const lastProjectId = getLastProjectId()

  const projectBoardPath = lastProjectId ? `/projects/${lastProjectId}/board` : '/projects'
  const projectSettingsPath = lastProjectId ? `/projects/${lastProjectId}/settings` : '/projects'
  const projectDashboardPath = lastProjectId ? `/projects/${lastProjectId}/dashboard` : '/projects'

  const navItems = [
    { to: '/projects', icon: Home, label: 'Projects' },
    { to: projectBoardPath, icon: LayoutGrid, label: 'Board' },
    { to: projectSettingsPath, icon: Users, label: 'Members' },
    { to: projectDashboardPath, icon: Settings, label: 'Dashboard' }
  ]

  const onAvatarClick = (event) => {
    setRect(event.currentTarget.getBoundingClientRect())
    setOpen((value) => !value)
  }

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-14 flex-col items-center border-r border-[var(--border-color)] bg-[var(--bg-elevated)]/80 backdrop-blur-xl py-2 md:flex">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/projects" className="flex h-10 w-10 items-center justify-center rounded premium-gradient text-lg font-bold text-white shadow-lg shadow-jira-blue/20">T</Link>
      </motion.div>
      <nav className="mt-2 flex flex-col items-center gap-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname.startsWith(to)
          return (
            <motion.div key={label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={to}
                title={label}
                className={`flex h-10 w-10 items-center justify-center rounded transition-all duration-300 ${active ? 'bg-jira-blue text-white shadow-md' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                <Icon size={18} />
              </Link>
            </motion.div>
          )
        })}
      </nav>
      <div className="mt-auto pb-2 flex flex-col items-center gap-1">
        <motion.button 
          onClick={toggleTheme}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-10 w-10 items-center justify-center rounded text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
        <motion.button onClick={onAvatarClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="rounded-full shadow-md mt-1">
          <Avatar name={user?.name || 'TaskFlow User'} size={32} color={user?.avatarColor || '#0C66E4'} />
        </motion.button>
        <motion.button
          type="button"
          onClick={logout}
          title="Sign out"
          whileHover={{ scale: 1.1, color: '#F87168' }}
          whileTap={{ scale: 0.9 }}
          className="mt-2 flex h-10 w-10 items-center justify-center rounded text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
        >
          <LogOut size={18} />
        </motion.button>
      </div>
      <Dropdown isOpen={open} onClose={() => setOpen(false)} triggerRect={rect}>
        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-jira-text hover:bg-jira-overlay" onClick={() => setOpen(false)}>
          <Users size={14} /> Profile
        </button>
        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-jira-text hover:bg-jira-overlay" onClick={logout}>
          <LogOut size={14} /> Sign out
        </button>
      </Dropdown>
    </aside>
  )
}
