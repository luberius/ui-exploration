import '../css/progress-bar.css'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  color?: 'cyan' | 'green' | 'blue' | 'yellow' | 'red' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'cyan',
  size = 'md',
  className = ''
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  
  
  
  return (
    <div className={`space-progress-container ${className}`}>
      {(label || showPercentage) && (
        <div className="space-progress-header">
          {label && (
            <span className="space-progress-label">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className={`space-progress-percentage space-progress-fill--${color}`}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`space-progress-track space-progress-track--${size}`}>
        <div 
          className={`space-progress-fill space-progress-fill--${size} space-progress-fill--${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}