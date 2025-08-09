import '../css/legend-button.css'

interface LegendButtonProps {
  hotkey: string
  label: string
  onClick?: () => void
  active?: boolean
  className?: string
}

export default function LegendButton({
  hotkey,
  label,
  onClick,
  active = false,
  className = ''
}: LegendButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`space-legend-button ${active ? 'space-legend-button--active' : 'space-legend-button--inactive'} ${className}`}
    >
      <div className={`space-legend-hotkey ${active ? 'space-legend-hotkey--active' : 'space-legend-hotkey--inactive'}`}>
        {hotkey}
      </div>
      <span>{label}</span>
    </button>
  )
}