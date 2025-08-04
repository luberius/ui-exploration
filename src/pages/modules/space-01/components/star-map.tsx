import { StarMapPoint } from './ui'
import { useSpace } from '../context/space-context'
import { useRef, useState, useEffect } from 'react'
import './star-map.css'

export default function StarMap() {
  const { stars, selectedStar, setSelectedStar, mapState, setMapState } = useSpace()
  const mapRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [lastOffset, setLastOffset] = useState({ x: 0, y: 0 })

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === mapRef.current) {
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
      setLastOffset({ x: mapState.offsetX, y: mapState.offsetY })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y
      setMapState({
        ...mapState,
        offsetX: lastOffset.x + deltaX,
        offsetY: lastOffset.y + deltaY
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const zoomFactor = 0.1
    const newZoom = Math.max(0.5, Math.min(3, mapState.zoom + (e.deltaY > 0 ? -zoomFactor : zoomFactor)))
    setMapState({
      ...mapState,
      zoom: newZoom
    })
  }

  // Add global mouse events
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x
        const deltaY = e.clientY - dragStart.y
        setMapState({
          ...mapState,
          offsetX: lastOffset.x + deltaX,
          offsetY: lastOffset.y + deltaY
        })
      }
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragStart, lastOffset, mapState])

  const handleStarClick = (star: typeof stars[0]) => {
    setSelectedStar(star)
  }
  
  // Calculate arrow endpoint to target the star glow instead of the star center
  const getArrowEndpoint = (star: typeof stars[0]) => {
    const centerX = 50
    const centerY = 50
    const targetX = star.x
    const targetY = star.y
    
    // Calculate direction vector
    const dx = targetX - centerX
    const dy = targetY - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Normalize and extend to reach the star glow (size * 4 for the blur effect)
    const glowRadius = (star.size || 3) * 4 // This matches the star glow size
    const normalizedDx = dx / distance
    const normalizedDy = dy / distance
    
    // Calculate the point on the glow edge
    const endX = targetX - (normalizedDx * glowRadius * 0.06) // Adjusted for glow edge
    const endY = targetY - (normalizedDy * glowRadius * 0.06)
    
    return { x: endX, y: endY }
  }
  
  return (
    <div 
      ref={mapRef}
      className={`space-map ${isDragging ? 'space-map--dragging' : 'space-map--idle'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      style={{
        transform: `scale(${mapState.zoom}) translate(${mapState.offsetX}px, ${mapState.offsetY}px)`,
        transformOrigin: 'center center'
      }}
    >
      {/* Stars */}
      {stars.map((star) => (
        <StarMapPoint
          key={star.id}
          x={star.x}
          y={star.y}
          size={star.size}
          color={star.color}
          selected={selectedStar?.id === star.id}
          label={star.name}
          sublabel={`${star.planets} PLANETS | ${star.distance} LY`}
          onClick={() => handleStarClick(star)}
        />
      ))}
      
      {/* Travel route indicator */}
      {selectedStar && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" className="space-route-arrow" />
            </marker>
          </defs>
          <line
            x1="50%"
            y1="50%"
            x2={`${getArrowEndpoint(selectedStar).x}%`}
            y2={`${getArrowEndpoint(selectedStar).y}%`}
            strokeWidth="2"
            strokeDasharray="5,5"
            markerEnd="url(#arrowhead)"
            className="space-route-line"
          />
        </svg>
      )}
      
      {/* Current position indicator (center) */}
      <div className="space-position-indicator">
        <div className="relative">
          <div className="space-position-marker" />
          <div className="space-position-ring" />
        </div>
      </div>
    </div>
  )
}