import './cards.css'

export default function MissionStatusCard() {
  const missions = [
    {
      id: 'JWST-EXO-001',
      name: 'Webb Deep Survey',
      target: 'TRAPPIST-1 System',
      progress: 78,
      status: 'Active',
      eta: '12 days'
    },
    {
      id: 'TESS-SCAN-442',
      name: 'TESS Sector 61',
      target: 'Kepler-442 Region',
      progress: 45,
      status: 'Scanning',
      eta: '28 days'
    },
    {
      id: 'PLATO-PREP-01',
      name: 'PLATO Calibration',
      target: 'Solar Analogs',
      progress: 92,
      status: 'Finalizing',
      eta: '3 days'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'Scanning':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      case 'Finalizing':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      default:
        return 'text-cyan-400 bg-cyan-400/20 border-cyan-400/30'
    }
  }

  return (
    <div className="relative group">
      {/* Glowing border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400/50 via-cyan-300/30 to-cyan-400/50 transition-all duration-300" />
      
      <div className="relative bg-slate-900/20 border border-cyan-400/30 p-6 group-hover:border-cyan-400/50 transition-all duration-300">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-mono font-bold text-cyan-300 mb-2 tracking-wider uppercase">[MISSION CONTROL]</h3>
          <p className="text-cyan-100/60 text-sm font-mono tracking-wide uppercase">&gt;&gt;&gt; ACTIVE SPACE EXPLORATION MISSIONS</p>
        </div>

        {/* Mission Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/20 border border-cyan-500/20 p-3">
            <div className="text-2xl font-mono font-bold text-cyan-300 tracking-wider">08</div>
            <div className="text-xs text-cyan-100/60 font-mono tracking-wider uppercase">ACTIVE</div>
          </div>
          <div className="bg-slate-800/20 border border-cyan-500/20 p-3">
            <div className="text-2xl font-mono font-bold text-green-400 tracking-wider">24</div>
            <div className="text-xs text-cyan-100/60 font-mono tracking-wider uppercase">TARGETS</div>
          </div>
        </div>

        {/* Missions List */}
        <div className="space-y-3">
          {missions.map((mission) => (
            <div 
              key={mission.id}
              className="bg-slate-800/20 border border-cyan-500/10 p-4 hover:border-cyan-400/30 hover:bg-slate-800/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-cyan-200 font-mono font-bold text-sm tracking-wider uppercase">{mission.name}</h4>
                  <p className="text-cyan-100/60 text-xs font-mono tracking-wide uppercase">&gt;&gt;&gt; {mission.target}</p>
                </div>
                <span className={`text-xs px-2 py-1 border font-mono tracking-wider uppercase ${getStatusColor(mission.status)}`}>
                  {mission.status}
                </span>
              </div>
              
              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-cyan-100/60 font-mono tracking-wide uppercase">PROG:</span>
                  <span className="text-cyan-300 font-mono font-bold tracking-wider">{mission.progress}%</span>
                </div>
                <div className="w-full h-1 bg-slate-700 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-1000"
                    style={{ width: `${mission.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-100/60 font-mono tracking-wide uppercase">ETA: {mission.eta}</span>
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-mono tracking-widest uppercase">
                  [MON] &gt;&gt;
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20">
          <button className="w-full text-center text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-300 font-mono tracking-widest uppercase">
            [LAUNCH NEW MISSION]
          </button>
        </div>
      </div>
    </div>
  )
}