import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function TopBar({ breadcrumb = [], actionLabel, onAction, rightSlot }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--border-color)] bg-white px-8">
      <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-secondary)]">
        {breadcrumb.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center gap-3">
            {index > 0 && <ChevronRight size={14} className="text-[var(--text-muted)]" />}
            {item.to ? (
              <Link to={item.to} className="hover:text-[var(--text-primary)] transition-colors">{item.label}</Link>
            ) : (
              <span className="text-[var(--text-primary)] font-bold">{item.label}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {rightSlot}
        {actionLabel && (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAction}
            className="linear-btn-primary"
          >
            {actionLabel}
          </motion.button>
        )}
      </div>
    </header>
  )
}
