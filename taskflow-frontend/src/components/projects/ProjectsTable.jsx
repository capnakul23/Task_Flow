import ProjectRow from './ProjectRow'
import SkeletonRow from '../common/SkeletonRow'
import EmptyState from '../common/EmptyState'
import { motion } from 'framer-motion'
import { FolderOpen } from 'lucide-react'

export default function ProjectsTable({ projects = [], loading = false, onCreate }) {
  if (loading) return <div className="space-y-2">{Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)}</div>
  if (!projects.length) return <EmptyState icon={FolderOpen} title="No projects yet" description="Create a project to start tracking issues." actionLabel="Create project" onAction={onCreate} />

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-[var(--border-color)] bg-white overflow-hidden shadow-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#fcfcfc] text-left text-[10px] uppercase tracking-widest text-[var(--text-secondary)] border-b border-[var(--border-color)]">
            <tr>
              {['Name', 'Key', 'Lead', 'Members', 'Progress', 'Last updated'].map((heading) => (
                <th key={heading} className="px-8 py-4 font-black">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {projects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
