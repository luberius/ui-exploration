import { Routes, Route } from 'react-router'
import HomePage from './pages/app/App'
import ModulesLayout from './pages/modules/layout'
import Space01 from './pages/modules/space-01/space-01'
import Gallery01 from './pages/modules/gallery-01/gallery-01'
import FloatingMenu from './components/floating-menu'

function App() {
  const moduleRoutes = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/modules/space-01', label: 'Space 01', icon: '🚀' },
    { path: '/modules/gallery-01', label: 'Gallery 01', icon: '🖼️' },
  ]

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        
        <Route path="modules" element={<ModulesLayout />}>
          <Route path="space-01" element={<Space01 />} />
          <Route path="gallery-01" element={<Gallery01 />} />
        </Route>
      </Routes>
      
      {/* Global floating menu available on all pages */}
      <FloatingMenu routes={moduleRoutes} />
    </>
  )
}

export default App