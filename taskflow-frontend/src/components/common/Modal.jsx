import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose?.()
    if (isOpen) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null
  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg rounded-lg border border-jira-border bg-jira-elevated p-6 shadow-none"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="text-base font-semibold text-jira-text">{title}</div>
            <button className="rounded p-1 text-jira-text-subtle hover:bg-jira-overlay" onClick={onClose}><X size={18} /></button>
          </div>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  )
}
