import { ReactNode } from 'react'
import '../css/space-card.css'

interface SpaceCardProps {
  children: ReactNode
  className?: string
  glowEffect?: boolean
  opacity?: 'light' | 'medium' | 'heavy'
  border?: 'thin' | 'thick'
  hoverable?: boolean
}

export default function SpaceCard({ 
  children, 
  className = '', 
  glowEffect = false,
  opacity = 'light',
  border = 'thin',
  hoverable = false
}: SpaceCardProps) {
  const opacityClass = {
    light: 'bg-slate-900/20',
    medium: 'bg-slate-900/40', 
    heavy: 'bg-slate-900/60'
  }[opacity]
  
  
  
  return (
    <div className={`relative group ${className}`}>
      {/* Glow effect */}
      {glowEffect && (
        <div className="space-card-glow" />
      )}
      
      {/* Card content */}
      <div className={`space-card space-card--border-${border} ${hoverable ? 'space-card--hoverable' : ''} ${opacityClass}`}>
        {children}
      </div>
    </div>
  )
}