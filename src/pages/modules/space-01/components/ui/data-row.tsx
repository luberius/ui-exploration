import { ReactNode } from 'react'
import './data-row.css'

interface DataRowProps {
  label: string
  value: string | number | ReactNode
  valueColor?: 'default' | 'accent' | 'success' | 'warning' | 'danger'
  className?: string
}

export default function DataRow({ 
  label, 
  value, 
  valueColor = 'default',
  className = '' 
}: DataRowProps) {
  
  return (
    <div className={`space-data-row ${className}`}>
      <span className="space-data-label">
        {label}
      </span>
      <span className={`space-data-value space-data-value--${valueColor}`}>
        {value}
      </span>
    </div>
  )
}