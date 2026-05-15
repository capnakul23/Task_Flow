import ProjectRow from './ProjectRow'
import SkeletonRow from '../common/SkeletonRow'
import EmptyState from '../common/EmptyState'
import { FolderOpen } from 'lucide-react'

export default function ProjectsTable({ projects = [], loading = false, onCreate }) {
  if (loading) return <div className="space-y-2">{Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)}</div>
  if (!projects.length) return <EmptyState icon={FolderOpen} title="No projects yet" description="Create a project to start tracking issues." actionLabel="Create project" onAction={onCreate} />

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden rounded-2xl"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[var(--bg-secondary)]/50 text-left text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
            <tr>
              {['Name', 'Key', 'Lead', 'Members', 'Progress', 'Last updated'].map((heading) => (
                <th key={heading} className="px-6 py-4 font-bold">{heading}</th>
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
