import './css/cards.css'

export default function GalaxyMapCard() {
  const sectors = [
    { id: 1, name: 'Alpha Centauri', planets: 3, status: 'explored', x: 20, y: 30 },
    { id: 2, name: 'TRAPPIST-1', planets: 7, status: 'scanning', x: 60, y: 20 },
    { id: 3, name: 'Kepler-442', planets: 2, status: 'high-priority', x: 40, y: 60 },
    { id: 4, name: 'TOI-715', planets: 1, status: 'discovered', x: 75, y: 45 },
    { id: 5, name: 'HD-40307', planets: 6, status: 'analyzing', x: 25, y: 70 },
    { id: 6, name: 'Gliese-667C', planets: 3, status: 'explored', x: 80, y: 25 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'explored':
        return 'bg-green-400 shadow-green-400/50'
      case 'scanning':
        return 'bg-blue-400 shadow-blue-400/50 animate-pulse'
      case 'high-priority':
        return 'bg-red-400 shadow-red-400/50 animate-ping'
      case 'discovered':
        return 'bg-yellow-400 shadow-yellow-400/50'
      case 'analyzing':
        return 'bg-purple-400 shadow-purple-400/50'
      default:
        return 'bg-cyan-400 shadow-cyan-400/50'
    }
  }

  return (
    <div className="relative group">
      {/* Glowing border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400/50 via-cyan-300/30 to-cyan-400/50 transition-all duration-300" />
      
      <div className="relative bg-slate-900/20 border border-cyan-400/30 p-6 group-hover:border-cyan-400/50 transition-all duration-300">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-mono font-bold text-cyan-300 mb-2 tracking-wider uppercase">[GALAXY MAP]</h3>
          <p className="text-cyan-100/60 text-sm font-mono tracking-wide uppercase">&gt;&gt;&gt; SECTOR EXPLORATION STATUS</p>
        </div>

        {/* Map Container */}
        <div className="relative bg-slate-800/20 border border-cyan-500/20 p-4 h-64 overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Sectors */}
          {sectors.map((sector) => (
            <div
              key={sector.id}
              className="absolute group/sector cursor-pointer"
              style={{
                left: `${sector.x}%`,
                top: `${sector.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Planet marker */}
              <div className={`w-3 h-3 ${getStatusColor(sector.status)} shadow-lg`} />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover/sector:opacity-100 transition-opacity duration-300 z-10">
                <div className="bg-slate-900 border border-cyan-400/50 p-2 min-w-max">
                  <div className="text-cyan-300 font-mono font-bold text-xs tracking-wider uppercase">{sector.name}</div>
                  <div className="text-cyan-100/60 text-xs font-mono tracking-wide uppercase">[{sector.planets}] PLANETS</div>
                  <div className="text-cyan-100/60 text-xs font-mono tracking-wide uppercase">{sector.status.replace('-', ' ')}</div>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-cyan-400/50" />
              </div>
              
              {/* Scanning effect */}
              {sector.status === 'scanning' && (
                <div className="absolute inset-0 w-3 h-3 border-2 border-blue-400/50 animate-ping" />
              )}
            </div>
          ))}

          {/* Scanning waves */}
          <div className="absolute top-4 left-4">
            <div className="relative">
              <div className="w-8 h-8 border-2 border-cyan-400/30 animate-ping" />
              <div className="absolute inset-0 w-8 h-8 border-2 border-cyan-400/50 animate-ping" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400" />
            <span className="text-cyan-100/60 font-mono tracking-wider uppercase">EXPLORED</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400" />
            <span className="text-cyan-100/60 font-mono tracking-wider uppercase">SCANNING</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400" />
            <span className="text-cyan-100/60 font-mono tracking-wider uppercase">PRIORITY</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400" />
            <span className="text-cyan-100/60 font-mono tracking-wider uppercase">DISCOVERED</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-cyan-500/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-100/60 font-mono tracking-wide uppercase">
              [{sectors.length}] SECTORS MAPPED
            </span>
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-mono tracking-widest uppercase">
              [FULL MAP] &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}