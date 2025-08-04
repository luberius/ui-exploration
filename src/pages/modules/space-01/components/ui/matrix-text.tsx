import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface MatrixTextProps {
  children: string
  className?: string
  duration?: number
}

export default function MatrixText({ children, className = '', duration = 800 }: MatrixTextProps) {
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevTextRef = useRef(children)
  
  const chars = '01'
  
  useEffect(() => {
    if (prevTextRef.current !== children) {
      setIsAnimating(true)
      
      // Create matrix effect
      const targetText = children
      const currentText = prevTextRef.current
      const maxLength = Math.max(targetText.length, currentText.length)
      
      let frame = 0
      const totalFrames = duration / 50 // 50ms per frame
      
      const animate = () => {
        const progress = frame / totalFrames
        let newText = ''
        
        for (let i = 0; i < maxLength; i++) {
          const charProgress = Math.max(0, (progress * maxLength - i) / 3)
          
          if (charProgress >= 1) {
            // Show final character
            newText += targetText[i] || ''
          } else if (charProgress > 0) {
            // Show random matrix characters
            newText += chars[Math.floor(Math.random() * chars.length)]
          } else {
            // Show original character
            newText += currentText[i] || ''
          }
        }
        
        setDisplayText(newText)
        
        if (frame < totalFrames) {
          frame++
          setTimeout(animate, 50)
        } else {
          setDisplayText(targetText)
          setIsAnimating(false)
          prevTextRef.current = targetText
        }
      }
      
      animate()
    }
  }, [children, duration])
  
  return (
    <span className={`${className} ${isAnimating ? 'text-gray-400' : ''} transition-colors duration-300`}>
      {displayText}
    </span>
  )
}