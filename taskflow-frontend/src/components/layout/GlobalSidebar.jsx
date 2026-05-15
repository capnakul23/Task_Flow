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
    <>
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-16 flex-col items-center border-r border-[var(--border-color)] bg-white py-4 md:flex">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mb-8">
        <Link to="/projects" className="flex h-9 w-9 items-center justify-center bg-black text-white font-bold text-sm shadow-lg">T</Link>
      </motion.div>
      <nav className="flex flex-col items-center gap-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname.startsWith(to)
          return (
            <motion.div key={label} whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={to}
                title={label}
                className={`flex h-10 w-10 items-center justify-center transition-all duration-200 ${active ? 'bg-black text-white' : 'text-[#888] hover:text-[#111] hover:bg-[#f5f5f5]'}`}
              >
                <Icon size={18} strokeWidth={2.5} />
              </Link>
            </motion.div>
          )
        })}
      </nav>
      <div className="mt-auto flex flex-col items-center gap-4">
        <motion.button 
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          className="flex h-10 w-10 items-center justify-center text-[#888] hover:text-[#111]"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
        <div className="h-px w-8 bg-[#eee]" />
        <motion.button onClick={onAvatarClick} whileHover={{ scale: 1.1 }} className="shadow-sm">
          <Avatar name={user?.name || 'User'} size={32} color={user?.avatarColor || '#111'} />
        </motion.button>
        <motion.button
          onClick={logout}
          whileHover={{ color: '#ef4444' }}
          className="text-[#888] hover:bg-[#fff0f0] p-2"
        >
          <LogOut size={18} />
        </motion.button>
      </div>
    </aside>
    <Dropdown isOpen={open} onClose={() => setOpen(false)} triggerRect={rect}>
      <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]" onClick={() => setOpen(false)}>
        <User size={14} /> Profile
      </button>
      <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]" onClick={logout}>
        <LogOut size={14} /> Sign out
      </button>
    </Dropdown>
  </>
)
}
