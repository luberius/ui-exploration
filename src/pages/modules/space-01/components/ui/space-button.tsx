import { ReactNode } from 'react'
import { motion } from 'motion/react'
import './space-button.css'

interface SpaceButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  hotkey?: string
}

export default function SpaceButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  hotkey
}: SpaceButtonProps) {
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-4 py-2', 
    lg: 'text-base px-6 py-3'
  }[size]
  
  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  
  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={`
        space-button
        space-button--${variant}
        ${sizeClasses}
        ${widthClass}
        ${disabledClass}
        ${className}
        ${fullWidth ? 'text-center' : ''}
      `}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        boxShadow: disabled ? undefined : "0 0 20px rgba(6, 182, 212, 0.3)"
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      <div className="flex items-center justify-center space-x-2">
        <span>{children}</span>
        {hotkey && (
          <span className="space-button-hotkey">
            [{hotkey}]
          </span>
        )}
      </div>
    </motion.button>
  )
}