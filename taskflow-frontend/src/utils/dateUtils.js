import { format, formatDistanceToNow, isBefore, parseISO, addDays, isToday } from 'date-fns'

export const formatDueDate = (dateStr, status) => {
  if (!dateStr) return 'No due date'
  const date = parseISO(dateStr)
  if (isToday(date)) return 'Today'
  const tomorrow = addDays(new Date(), 1)
  if (format(date, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd')) return 'Tomorrow'
  if (isBefore(date, new Date()) && status !== 'DONE') return `${formatDistanceToNow(date, { addSuffix: false })} overdue`
  return format(date, 'MMM d')
}

export const isOverdue = (dateStr, status) => {
  if (!dateStr) return false
  return isBefore(parseISO(dateStr), new Date()) && status !== 'DONE'
}

export const formatDateTime = (dateStr) => (dateStr ? format(parseISO(dateStr), 'MMM d, yyyy · h:mm a') : '—')
