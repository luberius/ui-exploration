import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function DesktopOverlay() {
  const [isMobile, setIsMobile] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const isMobileDevice = width < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
      setShowOverlay(isMobileDevice)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  if (!isMobile) return null

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="max-w-md mx-4 p-8 bg-slate-900/95 border border-cyan-500/30 rounded-none text-center backdrop-blur-md"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6"
            >
              <div className="w-full h-full border-2 border-cyan-400 rounded-full border-t-transparent animate-pulse" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">
              DESKTOP REQUIRED
            </h2>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              Space-01 is optimized for desktop experience. Please access this module on a desktop or laptop for the full immersive experience.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowOverlay(false)}
              className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 rounded-none font-mono text-sm transition-all duration-200"
            >
              Continue Anyway
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}