import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Avatar from '../common/Avatar'
import AvatarGroup from '../common/AvatarGroup'
import { formatDistanceToNow } from 'date-fns'

export default function ProjectRow({ project, index = 0 }) {
  const progress = project.totalIssues ? Math.round((project.doneIssues / project.totalIssues) * 100) : 0

  return (
    <motion.tr 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="transition-colors hover:bg-[var(--bg-secondary)]/50 group"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg premium-gradient text-xs font-bold text-white shadow-sm">{project.keyCode?.[0] || project.name?.[0]}</div>
          <Link to={`/projects/${project.id}/board`} className="text-sm font-bold text-[var(--text-primary)] hover:text-jira-blue transition-colors">{project.name}</Link>
        </div>
      </td>
      <td className="px-6 py-4 text-xs text-[var(--text-secondary)] font-mono font-bold">{project.keyCode}</td>
      <td className="px-6 py-4 text-sm text-[var(--text-primary)]">
        <div className="flex items-center gap-2">
          <Avatar name={project.lead?.name || ''} color={project.lead?.avatarColor || '#0C66E4'} size={24} />
          <span className="font-medium">{project.lead?.name}</span>
        </div>
      </td>
      <td className="px-6 py-4"><AvatarGroup users={project.members || []} max={4} /></td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1.5 min-w-[120px]">
          <div className="flex items-center justify-between text-[10px] font-bold text-[var(--text-secondary)]">
            <span>{progress}%</span>
            <span>{project.doneIssues}/{project.totalIssues}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[var(--bg-secondary)] overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full premium-gradient" 
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-xs text-[var(--text-secondary)] font-medium">
        {formatDistanceToNow(new Date(project.updatedAt || project.createdAt), { addSuffix: true })}
      </td>
    </motion.tr>
  )
}
