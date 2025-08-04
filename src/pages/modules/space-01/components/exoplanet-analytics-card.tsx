import './cards.css'

export default function ExoplanetAnalyticsCard() {
  const analytics = {
    totalPlanets: 5420,
    habitablePlanets: 127,
    earthLikePlanets: 23,
    superEarths: 89,
    gasGiants: 2156,
    averageDistance: 1247
  }

  const recentTrends = [
    { metric: 'Discovery Rate', value: '+12%', trend: 'up', period: 'this month' },
    { metric: 'Habitability Score', value: '0.82', trend: 'stable', period: 'avg this week' },
    { metric: 'Mission Success', value: '94%', trend: 'up', period: 'last 30 days' },
    { metric: 'Data Processing', value: '2.1TB', trend: 'up', period: 'daily average' }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗'
      case 'down':
        return '↘'
      default:
        return '→'
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-400'
      case 'down':
        return 'text-red-400'
      default:
        return 'text-cyan-400'
    }
  }

  return (
    <div className="relative group">
      {/* Glowing border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400/50 via-cyan-300/30 to-cyan-400/50 transition-all duration-300" />
      
      <div className="relative bg-slate-900/20 border border-cyan-400/30 p-6 group-hover:border-cyan-400/50 transition-all duration-300">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-mono font-bold text-cyan-300 mb-2 tracking-wider uppercase">[ANALYTICS DASHBOARD]</h3>
          <p className="text-cyan-100/60 text-sm font-mono tracking-wide uppercase">&gt;&gt;&gt; EXOPLANET DISCOVERY & ANALYSIS METRICS</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Metrics */}
          <div>
            <h4 className="text-cyan-300 font-mono font-bold mb-4 tracking-wider uppercase">[DISCOVERY STATISTICS]</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/20 border border-cyan-500/20 p-3">
                <div className="text-xl font-mono font-bold text-cyan-300 tracking-wider">
                  {analytics.totalPlanets.toLocaleString()}
                </div>
                <div className="text-xs text-cyan-100/60 font-mono tracking-wider uppercase">TOTAL</div>
              </div>
              
              <div className="bg-slate-800/20 border border-green-500/20 p-3">
                <div className="text-xl font-mono font-bold text-green-400 tracking-wider">
                  {analytics.habitablePlanets}
                </div>
                <div className="text-xs text-cyan-100/60 font-mono tracking-wider uppercase">HABITABLE</div>
              </div>
              
              <div className="bg-slate-800/20 border border-blue-500/20 p-3">
                <div className="text-xl font-mono font-bold text-blue-400 tracking-wider">
                  {analytics.earthLikePlanets}
                </div>
                <div className="text-xs text-cyan-100/60 font-mono tracking-wider uppercase">EARTH-LIKE</div>
              </div>
              
              <div className="bg-slate-800/20 border border-purple-500/20 p-3">
                <div className="text-xl font-mono font-bold text-purple-400 tracking-wider">
                  {analytics.superEarths}
                </div>
                <div className="text-xs text-cyan-100/60 font-mono tracking-wider uppercase">SUPER EARTHS</div>
              </div>
            </div>

            {/* Distance Average */}
            <div className="mt-4 bg-slate-800/20 border border-cyan-500/10 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-mono font-bold text-cyan-300 tracking-wider">
                    {analytics.averageDistance} ly
                  </div>
                  <div className="text-xs text-cyan-100/60 font-mono tracking-wider uppercase">AVG DIST</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-cyan-400 font-mono tracking-wider">42 ly</div>
                  <div className="text-xs text-cyan-100/60 font-mono tracking-wider uppercase">CLOSEST</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trends */}
          <div>
            <h4 className="text-cyan-300 font-mono font-bold mb-4 tracking-wider uppercase">[RECENT TRENDS]</h4>
            <div className="space-y-3">
              {recentTrends.map((item, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/20 border border-cyan-500/10 p-3 hover:border-cyan-400/30 hover:bg-slate-800/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-mono font-bold text-cyan-200 tracking-wider uppercase">
                        {item.metric}
                      </div>
                      <div className="text-xs text-cyan-100/60 font-mono tracking-wide uppercase">
                        {item.period}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-mono font-bold ${getTrendColor(item.trend)} flex items-center space-x-1 tracking-wider`}>
                        <span>{item.value}</span>
                        <span className="text-sm">{getTrendIcon(item.trend)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="mt-4 bg-slate-800/20 border border-cyan-500/10 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-cyan-200 font-mono tracking-wider uppercase">SYS PROC</span>
                <span className="text-sm text-cyan-400 font-mono tracking-wider">87%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-1000"
                  style={{ width: '87%' }}
                />
              </div>
              <div className="text-xs text-cyan-100/60 mt-1 font-mono tracking-wide uppercase">
                NEXT BATCH IN 4H 23M
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
          <div className="flex space-x-3">
            <button className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-300 font-mono tracking-widest uppercase">
              [EXPORT]
            </button>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-300 font-mono tracking-widest uppercase">
              [ADVANCED]
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-mono tracking-widest uppercase">[REAL-TIME]</span>
          </div>
        </div>
      </div>
    </div>
  )
}