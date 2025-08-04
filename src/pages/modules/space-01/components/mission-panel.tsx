import { CollapsiblePanel, ProgressBar, StatusBadge, SpaceButton } from './ui'
import './mission-panel.css'

export default function MissionPanel() {
  const missions = [
    {
      id: "M-001",
      title: "PLANETARY SURVEY",
      target: "KEPLER-442B",
      status: "ACTIVE",
      progress: 78,
      eta: "4H 23M"
    },
    {
      id: "M-002", 
      title: "DEEP SPACE SCAN",
      target: "TRAPPIST-1",
      status: "QUEUED",
      progress: 0,
      eta: "12H 45M"
    },
    {
      id: "M-003",
      title: "RESOURCE ANALYSIS", 
      target: "TOI-715B",
      status: "COMPLETE",
      progress: 100,
      eta: "DONE"
    }
  ]


  const missionIcon = (
    <div className="space-mission-icon">
      [{missions.filter(m => m.status === 'ACTIVE').length}]
    </div>
  )

  return (
    <CollapsiblePanel 
      title="MISSIONS" 
      icon={missionIcon}
      defaultCollapsed={false}
    >
      
      <div className="space-y-3">
        {missions.map((mission) => (
          <div key={mission.id} className="space-mission-item">
            <div className="space-mission-header">
              <div>
                <div className="space-mission-title">{mission.title}</div>
                <div className="space-mission-target">&gt;&gt;&gt; {mission.target}</div>
              </div>
              <StatusBadge 
                status={mission.status} 
                variant={mission.status === 'ACTIVE' ? 'success' : mission.status === 'QUEUED' ? 'warning' : 'info'}
              />
            </div>
            
            {mission.status !== 'COMPLETE' && (
              <div className="mb-2">
                <ProgressBar 
                  value={mission.progress} 
                  label="PROGRESS" 
                  color={mission.status === 'ACTIVE' ? 'green' : 'cyan'}
                  size="sm"
                />
              </div>
            )}
            
            <div className="space-mission-footer">
              <span className="space-mission-eta">
                {mission.status === 'COMPLETE' ? 'COMPLETED' : `ETA: ${mission.eta}`}
              </span>
              <button className="space-mission-action">
                {mission.status === 'COMPLETE' ? '[VIEW]' : '[MONITOR]'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-section-divider space-section-divider--margin">
        <SpaceButton variant="primary" size="sm" fullWidth>
          NEW MISSION
        </SpaceButton>
      </div>
    </CollapsiblePanel>
  )
}