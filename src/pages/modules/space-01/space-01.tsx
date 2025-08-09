import StarMap from './components/star-map'
import SystemInfoPanel from './components/system-info-panel'
import FactionPanel from './components/faction-panel'
import MissionPanel from './components/mission-panel'
import NavigationHUD from './components/navigation-hud'
import DesktopOverlay from './components/desktop-overlay'
import { SpaceProvider } from './context/space-context'
import { motion } from 'motion/react'
import './components/css/base.css'

export default function Space01() {
  return (
    <SpaceProvider>
    <div 
      className="space-container"
      style={{
        backgroundImage: "url('/src/assets/wallhaven-1j3vj9_2560x1440.png')"
      }}
    >
      <DesktopOverlay />
      {/* Dark overlay for better readability */}
      <div className="space-overlay" />
      
      {/* Coordinate Grid Overlay */}
      <div className="space-grid">
        <div className="space-grid-pattern" />
      </div>
      
      {/* Crosshair lines */}
      <div className="space-crosshairs">
        <div className="space-crosshair-h" />
        <div className="space-crosshair-v" />
      </div>
      
      {/* Main Star Map */}
      <div className="absolute inset-0">
        <StarMap />
      </div>
      
      {/* Left Side Panel - System Info */}
      <motion.div 
        className="space-panel-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SystemInfoPanel />
      </motion.div>
      
      {/* Right Side Panel - Faction Info */}
      <motion.div 
        className="space-panel-right-top"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FactionPanel />
      </motion.div>
      
      {/* Bottom Right - Mission Panel */}
      <motion.div 
        className="space-panel-right-bottom"
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <MissionPanel />
      </motion.div>
      
      {/* Bottom Left - Navigation Legend */}
      <motion.div 
        className="space-panel-left-bottom"
        initial={{ x: -100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <NavigationHUD />
      </motion.div>
      
      {/* Top Center - Main Title */}
      <motion.div 
        className="space-title-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="text-center">
          <motion.h1 
            className="space-title"
            animate={{
              textShadow: [
                `0 0 10px rgba(var(--space-primary), 0.3)`,
                `0 0 20px rgba(var(--space-accent), 0.4)`,
                `0 0 10px rgba(var(--space-primary), 0.3)`
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            NEXUS TERRA EXPLORER
          </motion.h1>
        </div>
      </motion.div>
    </div>
    </SpaceProvider>
  );
}