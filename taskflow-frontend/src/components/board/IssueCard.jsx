import { motion } from 'framer-motion'
import Avatar from '../common/Avatar'
import { IssueTypeIcon, PriorityIcon } from '../common/Badge'

export default function IssueCard({ issue, onClick }) {
  return (
    <motion.div
      initial={{ y: 4, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className="cursor-pointer rounded border border-jira-border bg-jira-surface p-3 transition-colors duration-150 hover:border-jira-blue-bold hover:bg-jira-elevated"
    >
      <div className="line-clamp-2 text-sm text-jira-text">{issue.title}</div>
      <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-jira-text-subtle">
        <div className="flex items-center gap-1.5">
          <IssueTypeIcon type={issue.issueType} />
          <span className="font-mono">#{issue.issueKey}</span>
        </div>
        <div className="flex items-center gap-2">
          <PriorityIcon priority={issue.priority} />
          {issue.assignee ? <Avatar name={issue.assignee.name} color={issue.assignee.avatarColor} size={20} /> : <span>Unassigned</span>}
        </div>
      </div>
    </motion.div>
  )
}
