import { motion } from 'framer-motion'
import Avatar from '../common/Avatar'
import { formatDueDate } from '../../utils/dateUtils'

export default function OverdueIssuesList({ issues = [] }) {
  if (!issues.length) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-8 rounded-2xl text-center text-emerald-500 font-medium"
      >
        All clear! No overdue issues found.
      </motion.div>
    )
  }

  return (
    <div className="space-y-3">
      {issues.map((issue, index) => (
        <motion.div 
          key={issue.id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: 5 }}
          className="glass-card p-4 rounded-xl flex items-center gap-4 group cursor-pointer"
        >
          <div className="h-10 w-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-jira-blue transition-colors">
              <span className="text-[var(--text-secondary)] mr-2">{issue.issueKey}</span>
              {issue.title}
            </div>
            <div className="mt-1 text-xs font-semibold text-rose-500 flex items-center gap-1">
              <div className="h-1 w-1 rounded-full bg-rose-500" />
              {formatDueDate(issue.dueDate, issue.status)}
            </div>
          </div>
          <div className="flex -space-x-2">
            {issue.assignee && (
              <div className="border-2 border-[var(--bg-elevated)] rounded-full">
                <Avatar name={issue.assignee.name} color={issue.assignee.avatarColor} size={28} />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
