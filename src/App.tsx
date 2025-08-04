import { Routes, Route } from 'react-router'
import HomePage from './pages/app/App'
import ModulesLayout from './pages/modules/layout'
import Dashboard from './pages/modules/dashboard/dashboard'
import Places from './pages/modules/places/places'
import Space01 from './pages/modules/space-01/space-01'
import FloatingMenu from './components/floating-menu'

function App() {
  const moduleRoutes = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/modules/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/modules/places', label: 'Places', icon: '📍' },
    { path: '/modules/space-01', label: 'Space 01', icon: '🚀' },
  ]

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        
        <Route path="modules" element={<ModulesLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="places" element={<Places />} />
          <Route path="space-01" element={<Space01 />} />
        </Route>
      </Routes>
      
      {/* Global floating menu available on all pages */}
      <FloatingMenu routes={moduleRoutes} />
    </>
  )
}

export default App