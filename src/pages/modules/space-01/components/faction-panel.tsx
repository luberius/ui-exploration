import { CollapsiblePanel, DataRow, ProgressBar } from './ui'
import './faction-panel.css'

export default function FactionPanel() {
  const factionIcon = (
    <div className="space-faction-icon">
      <div className="space-faction-icon-dot"></div>
    </div>
  )

  return (
    <CollapsiblePanel 
      title="FACTION" 
      icon={factionIcon}
      defaultCollapsed={true}
    >
      <div className="space-faction-name">
        NEXUS COLLECTIVE
      </div>
      <div className="space-y-3 mb-6">
        <DataRow label="STATUS" value="ALLIED" valueColor="success" />
        <DataRow label="REPUTATION" value="+87" />
        <DataRow label="TERRITORY" value="156 SYSTEMS" />
        <DataRow label="TECH LEVEL" value="VII" valueColor="accent" />
      </div>
      
      {/* Relations */}
      <div className="space-section-divider">
        <div className="space-section-title space-section-title--sm mb-3">[RELATIONS]</div>
        
        <div className="space-y-2">
          <DataRow label="TERRA UNION" value="+45" valueColor="success" />
          <DataRow label="VOID RAIDERS" value="-23" valueColor="danger" />
          <DataRow label="STELLAR GUILD" value="+12" valueColor="warning" />
        </div>
      </div>
      
      {/* Current Objective */}
      <div className="space-section-divider space-section-divider--margin">
        <div className="space-section-title space-section-title--sm mb-2">[CURRENT OBJECTIVE]</div>
        <div className="space-objective-text">
          LOCATE HABITABLE WORLDS IN KEPLER SECTOR
        </div>
        
        <div className="mt-3">
          <ProgressBar value={67} label="PROGRESS" color="blue" size="sm" />
        </div>
      </div>
    </CollapsiblePanel>
  )
}