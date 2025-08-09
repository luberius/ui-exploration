import { ReactNode, useState } from 'react'
import SpaceCard from './space-card'
import { motion, AnimatePresence } from 'motion/react'
import '../css/collapsible-panel.css'

interface CollapsiblePanelProps {
  title: string
  children: ReactNode
  defaultCollapsed?: boolean
  icon?: ReactNode
  className?: string
  onToggle?: (collapsed: boolean) => void
}

export default function CollapsiblePanel({
  title,
  children,
  defaultCollapsed = false,
  icon,
  className = '',
  onToggle
}: CollapsiblePanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  const handleToggle = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    onToggle?.(newState)
  }

  return (
    <SpaceCard className={className} hoverable>
      {/* Header */}
      <div 
        className="space-panel-header"
        onClick={handleToggle}
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="space-panel-icon">
              {icon}
            </div>
          )}
          <h3 className="space-panel-title">
            [{title}]
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Collapse indicator */}
          <div className="space-panel-collapse-icon">
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {/* Status indicator */}
          <div className={`w-2 h-2 transition-colors duration-300 ${isCollapsed ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`} />
          
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut",
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <motion.div 
              className="space-panel-content"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </SpaceCard>
  )
}