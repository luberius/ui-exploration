import { LegendButton } from './ui'
import { useState } from 'react'
import { useSpace } from '../context/space-context'
import './navigation-hud.css'

export default function NavigationHUD() {
  const { mapState, setMapState } = useSpace()
  const [activeAction, setActiveAction] = useState<string | null>(null)

  const actions = [
    { key: '1', label: 'MISSIONS', id: 'missions' },
    { key: 'V', label: 'SHOW ME', id: 'show' },
    { key: 'X', label: 'SET COURSE', id: 'course' },
    { key: 'TAB', label: 'BACK', id: 'back' }
  ]

  return (
    <div className="bg-slate-900/10 border border-cyan-400/20 p-3 min-w-max">
      {/* Legend Header */}
      <div className="space-hud-header">
        CONTROLS
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-2">
        {actions.map((action) => (
          <LegendButton
            key={action.id}
            hotkey={action.key}
            label={action.label}
            active={activeAction === action.id}
            onClick={() => {
              setActiveAction(activeAction === action.id ? null : action.id)
              console.log(`Action: ${action.label}`)
            }}
          />
        ))}
      </div>
      
      {/* Quick Info */}
      <div className="mt-4 pt-3 border-t border-cyan-400/10">
        <div className="space-hud-label">
          OFFSET
        </div>
        <div className="space-hud-value">
          {Math.round(mapState.offsetX)} | {Math.round(mapState.offsetY)}
        </div>
        
        <div className="space-hud-label" style={{ marginTop: '0.5rem' }}>
          ZOOM
        </div>
        <div className="space-hud-value">
          {(mapState.zoom * 100).toFixed(0)}%
        </div>
        
        {/* Reset button */}
        <button 
          onClick={() => setMapState({ zoom: 1, offsetX: 0, offsetY: 0, isDragging: false })}
          className="space-hud-reset"
        >
          [RESET VIEW]
        </button>
      </div>
    </div>
  )
}