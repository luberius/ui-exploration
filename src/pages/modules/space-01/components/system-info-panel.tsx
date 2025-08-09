import { SpaceCard, DataRow, ProgressBar, StatusBadge, SectionHeader, SpaceButton, MatrixText } from './ui'
import { useSpace } from '../context/space-context'
import './css/system-info-panel.css'

export default function SystemInfoPanel() {
  const { selectedStar } = useSpace()
  
  if (!selectedStar) {
    return (
      <motion.div 
        className="h-full flex flex-col space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SpaceCard>
          <motion.div 
            className="text-center py-8"
            animate={{ 
              opacity: [0.4, 1, 0.4] 
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="space-empty-state">
              SELECT A STAR SYSTEM
            </div>
            <div className="space-empty-state-sub">
              CLICK ON ANY STAR TO VIEW DETAILS
            </div>
          </motion.div>
        </SpaceCard>
      </motion.div>
    )
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* System Header */}
      <SpaceCard>
        <SectionHeader title="STAR" />
        <div className="space-system-name">
          <MatrixText>{selectedStar.name}</MatrixText>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="space-system-target-label">TARGET</div>
          <StatusBadge 
            status={selectedStar.habitablePlanets > 0 ? "HIGH PRIORITY" : "SURVEYED"} 
            variant={selectedStar.habitablePlanets > 0 ? "success" : "info"} 
          />
        </div>
        
      </SpaceCard>
      
      {/* System Data */}
      <SpaceCard className="flex-1">
        <div className="space-y-3">
          <DataRow label="SPECTRAL CLASS" value={<MatrixText>{selectedStar.spectralClass}</MatrixText>} />
          <DataRow label="CATALOGUE ID" value={<MatrixText>{selectedStar.catalogueId}</MatrixText>} />
          <DataRow label="TEMPERATURE" value={<MatrixText>{`${selectedStar.temperature}K`}</MatrixText>} />
          <DataRow label="MASS" value={<MatrixText>{`${selectedStar.mass}M☉`}</MatrixText>} />
          <DataRow label="RADIUS" value={<MatrixText>{`${selectedStar.radius}R☉`}</MatrixText>} />
          <DataRow label="MAGNITUDE" value={<MatrixText>{selectedStar.magnitude.toString()}</MatrixText>} />
          <DataRow label="PLANETS" value={<MatrixText>{selectedStar.planets.toString()}</MatrixText>} valueColor="success" />
          <DataRow label="HABITABLE" value={<MatrixText>{selectedStar.habitablePlanets.toString()}</MatrixText>} valueColor={selectedStar.habitablePlanets > 0 ? "success" : "default"} />
          <DataRow label="DISTANCE" value={<MatrixText>{`${selectedStar.distance} LY`}</MatrixText>} />
        </div>
        
        {/* Survey Progress */}
        <div className="mt-6 pt-4 border-t border-cyan-400/20">
          <ProgressBar 
            value={selectedStar.surveyProgress} 
            label="SURVEY" 
            color={selectedStar.surveyProgress === 100 ? "green" : "cyan"} 
          />
        </div>
        
        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <SpaceButton variant="secondary" size="sm" fullWidth>
            DETAILED SCAN
          </SpaceButton>
          <SpaceButton variant="primary" size="sm" fullWidth>
            SET COURSE
          </SpaceButton>
        </div>
      </SpaceCard>
    </div>
  )
}