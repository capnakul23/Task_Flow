import { useLocation, Link } from 'react-router-dom'
import { Home, LayoutGrid, Users, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'
import Avatar from '../common/Avatar'
import Dropdown from '../common/Dropdown'
import { useAuth } from '../../hooks/useAuth'
import { getLastProjectId } from '../../utils/tokenUtils'

export default function GlobalSidebar() {
  const location = useLocation()
  const { user, logout } = useAuth()
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
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-14 flex-col items-center border-r border-jira-border bg-jira-sidebar py-2 md:flex">
      <Link to="/projects" className="flex h-10 w-10 items-center justify-center rounded bg-jira-blue text-lg font-bold text-white">T</Link>
      <nav className="mt-2 flex flex-col items-center gap-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname.startsWith(to)
          return (
            <Link
              key={label}
              to={to}
              title={label}
              className={`flex h-10 w-10 items-center justify-center rounded ${active ? 'bg-jira-blue-bg text-jira-blue-bold' : 'text-jira-text-subtle hover:bg-jira-sidebar-icon hover:text-jira-text'}`}
            >
              <Icon size={18} />
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto pb-2">
        <button onClick={onAvatarClick} className="rounded-full">
          <Avatar name={user?.name || 'TaskFlow User'} size={32} color={user?.avatarColor || '#0C66E4'} />
        </button>
        <button
          type="button"
          onClick={logout}
          title="Sign out"
          className="mt-2 flex h-10 w-10 items-center justify-center rounded text-jira-text-subtle hover:bg-jira-sidebar-icon hover:text-jira-text"
        >
          <LogOut size={18} />
        </button>
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
