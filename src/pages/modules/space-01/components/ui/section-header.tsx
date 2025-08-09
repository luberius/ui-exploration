import { ReactNode } from 'react'
import '../css/section-header.css'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
  level?: 1 | 2 | 3
  className?: string
}

export default function SectionHeader({ 
  title, 
  subtitle,
  children,
  level = 1,
  className = '' 
}: SectionHeaderProps) {
  const levelClass = {
    1: 'space-section-title--lg',
    2: 'space-section-title--md', 
    3: 'space-section-title--sm'
  }[level]
  
  return (
    <div className={`space-section-header ${className}`}>
      <div>
        <h2 className={`space-section-title ${levelClass}`}>
          [{title}]
        </h2>
        {subtitle && (
          <p className="space-section-subtitle">
            &gt;&gt;&gt; {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="space-section-actions">
          {children}
        </div>
      )}
    </div>
  )
}