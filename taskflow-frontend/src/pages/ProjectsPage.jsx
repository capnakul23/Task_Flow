import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import TopBar from '../components/layout/TopBar'
import ProjectsTable from '../components/projects/ProjectsTable'
import CreateProjectModal from '../components/projects/CreateProjectModal'
import { getLastProjectId, saveLastProjectId } from '../utils/tokenUtils'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const load = async () => {
    try {
      setLoading(true)
      const response = await api.get('/projects')
      setProjects(response.data)
      if (response.data?.length && !getLastProjectId()) {
        saveLastProjectId(response.data[0].id)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const createProject = async (payload) => {
    try {
      await api.post('/projects', payload)
      toast.success('Project created!')
      setOpen(false)
      await load()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create project')
    }
  }

    <div className="min-h-screen">
      <TopBar breadcrumb={[{ label: 'Projects' }]} actionLabel="Create project" onAction={() => setOpen(true)} />
      <div className="p-8 md:p-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Your Projects</h1>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="rounded-full bg-jira-blue px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-jira-blue/25 hover:bg-jira-blue-hover transition-all"
          >
            New Project
          </motion.button>
        </motion.div>
        <ProjectsTable projects={projects} loading={loading} onCreate={() => setOpen(true)} />
      </div>
      <CreateProjectModal isOpen={open} onClose={() => setOpen(false)} onCreate={createProject} />
    </div>
  )
}
