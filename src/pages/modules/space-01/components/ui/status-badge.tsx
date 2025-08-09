import '../css/status-badge.css'

interface StatusBadgeProps {
  status: string
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  size?: 'sm' | 'md'
  className?: string
}

export default function StatusBadge({ 
  status, 
  variant = 'neutral',
  size = 'sm',
  className = '' 
}: StatusBadgeProps) {
  
  
  return (
    <span className={`space-status-badge space-status-badge--${size} space-status-badge--${variant} ${className}`}>
      {status}
    </span>
  )
}