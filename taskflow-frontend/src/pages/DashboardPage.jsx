import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import TopBar from '../components/layout/TopBar'
import StatWidget from '../components/dashboard/StatWidget'
import IssueStatusChart from '../components/dashboard/IssueStatusChart'
import IssuesByAssigneeChart from '../components/dashboard/IssuesByAssigneeChart'
import OverdueIssuesList from '../components/dashboard/OverdueIssuesList'
import { useOutletContext } from 'react-router-dom'

export default function DashboardPage() {
  const shell = useOutletContext() || {}
  const [project, setProject] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const projectId = window.location.pathname.split('/')[2]
    shell.refreshProject?.()
    Promise.all([api.get(`/projects/${projectId}`), api.get('/dashboard')])
      .then(([projectRes, dashboardRes]) => {
        setProject(projectRes.data.project)
        setData(dashboardRes.data)
      })
      .catch((error) => toast.error(error?.response?.data?.message || 'Failed to load dashboard'))
  }, [])

  const statusData = [
    { name: 'To do', value: data?.todoCount || 0 },
    { name: 'In progress', value: data?.inProgressCount || 0 },
    { name: 'Done', value: data?.doneCount || 0 }
  ]

  const assigneeData = (data?.issuesByUser || []).map((item) => ({ name: item.userName, count: item.count }))

  return (
    <div className="min-h-screen">
      <TopBar breadcrumb={[{ label: 'Projects', to: '/projects' }, { label: project?.name || 'Project' }, { label: 'Dashboard' }]} />
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">Project Dashboard</h1>
        </motion.div>
        
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatWidget label="Total issues" value={data?.totalIssues || 0} />
          <StatWidget label="In progress" value={data?.inProgressCount || 0} accent="purple" />
          <StatWidget label="Done" value={data?.doneCount || 0} accent="green" />
          <StatWidget label="Overdue" value={data?.overdueCount || 0} accent="red" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <IssueStatusChart data={statusData} />
          <IssuesByAssigneeChart data={assigneeData} />
        </div>

        <div className="mt-12">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Overdue Attention Required</h2>
          </div>
          <OverdueIssuesList issues={data?.overdueIssues || []} />
        </div>
      </div>
    </div>
  )
}
