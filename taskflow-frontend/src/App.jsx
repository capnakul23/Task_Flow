import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProjectsPage from './pages/ProjectsPage'
import BoardPage from './pages/BoardPage'
import DashboardPage from './pages/DashboardPage'
import ProjectSettingsPage from './pages/ProjectSettingsPage'
import NotFound from './pages/NotFound'
import LandingPage from './pages/LandingPage'
import AppShell from './components/layout/AppShell'

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <div className="flex min-h-screen items-center justify-center bg-jira-bg text-jira-text">Loading...</div>
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

function PublicRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/projects" replace /> : <Outlet />
}

function ShellRoute() {
  return <AppShell />
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ style: { background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }, success: { iconTheme: { primary: '#4BCE97', secondary: 'var(--bg-elevated)' } }, error: { iconTheme: { primary: '#F87168', secondary: 'var(--bg-elevated)' } } }} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<ShellRoute />}>
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id/board" element={<BoardPage />} />
                <Route path="/projects/:id/dashboard" element={<DashboardPage />} />
                <Route path="/projects/:id/settings" element={<ProjectSettingsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
