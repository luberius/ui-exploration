import './css/cards.css'

export default function PlanetDiscoveryCard() {
  const recentDiscoveries = [
    {
      id: 'KPL-442b',
      name: 'Kepler-442b',
      distance: '1,206 ly',
      habitability: 92,
      type: 'Super Earth',
      discovery: '2025-07-15',
      status: 'High Priority'
    },
    {
      id: 'TOI-715b',
      name: 'TOI-715b',
      distance: '137 ly',
      habitability: 87,
      type: 'Earth-like',
      discovery: '2025-07-12',
      status: 'Analyzing'
    },
    {
      id: 'HD-40307g',
      name: 'HD-40307g',
      distance: '42 ly',
      habitability: 78,
      type: 'Super Earth',
      discovery: '2025-07-08',
      status: 'Confirmed'
    }
  ]

  return (
    <div className="relative group">
      {/* Glowing border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400/50 via-cyan-300/30 to-cyan-400/50 transition-all duration-300" />
      
      <div className="relative bg-slate-900/20 border border-cyan-400/30 p-6 group-hover:border-cyan-400/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-mono font-bold text-cyan-300 tracking-wider uppercase">[RECENT DISCOVERIES]</h3>
            <p className="text-cyan-100/60 text-sm font-mono tracking-wide uppercase">&gt;&gt;&gt; POTENTIALLY HABITABLE EXOPLANETS</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-mono font-bold tracking-widest">[LIVE]</span>
          </div>
        </div>

        {/* Discoveries List */}
        <div className="space-y-4">
          {recentDiscoveries.map((planet) => (
            <div 
              key={planet.id}
              className="relative bg-slate-800/20 border border-cyan-500/20 p-4 hover:border-cyan-400/40 hover:bg-slate-800/20 transition-all duration-300 group/item"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-cyan-200 font-mono font-bold tracking-wider uppercase">{planet.name}</h4>
                    <span className="text-xs px-2 py-1 bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-mono tracking-wider uppercase">
                      {planet.type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-cyan-100/60 font-mono tracking-wide uppercase">DIST:</span>
                      <span className="text-cyan-200 ml-2 font-mono tracking-wider">{planet.distance}</span>
                    </div>
                    <div>
                      <span className="text-cyan-100/60 font-mono tracking-wide uppercase">DISC:</span>
                      <span className="text-cyan-200 ml-2 font-mono tracking-wider">{planet.discovery}</span>
                    </div>
                  </div>
                </div>
                
                {/* Habitability Score */}
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold text-green-400 mb-1 tracking-wider">
                    {planet.habitability}%
                  </div>
                  <div className="text-xs text-cyan-100/60 font-mono tracking-wider uppercase">HABIT</div>
                  
                  {/* Progress bar */}
                  <div className="w-16 h-1 bg-slate-700 mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                      style={{ width: `${planet.habitability}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-cyan-500/10">
                <span className={`text-xs px-2 py-1 font-mono tracking-wider uppercase ${
                  planet.status === 'High Priority' 
                    ? 'bg-red-400/20 text-red-300 border border-red-400/30'
                    : planet.status === 'Analyzing'
                    ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                    : 'bg-green-400/20 text-green-300 border border-green-400/30'
                }`}>
                  {planet.status}
                </span>
                
                <button className="text-cyan-400 hover:text-cyan-300 text-xs font-mono tracking-widest uppercase opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                  [VIEW] &gt;&gt;
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-100/60 font-mono tracking-wide uppercase">
              [{recentDiscoveries.length}] PLANETS DISCOVERED THIS WEEK
            </span>
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-mono tracking-widest uppercase">
              [VIEW ALL] &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}