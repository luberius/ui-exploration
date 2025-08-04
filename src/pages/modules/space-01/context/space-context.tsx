import { createContext, useContext, useState, ReactNode } from 'react'

export interface Star {
  id: number
  name: string
  x: number
  y: number
  size: number
  color: 'blue' | 'white' | 'yellow' | 'red' | 'cyan' | 'purple' | 'orange' | 'green' | 'indigo' | 'pink'
  spectralClass: string
  temperature: number
  mass: number
  radius: number
  magnitude: number
  planets: number
  habitablePlanets: number
  distance: number
  catalogueId: string
  surveyProgress: number
}

export interface MapState {
  zoom: number
  offsetX: number
  offsetY: number
  isDragging: boolean
}

interface SpaceContextType {
  selectedStar: Star | null
  setSelectedStar: (star: Star | null) => void
  mapState: MapState
  setMapState: (state: MapState) => void
  stars: Star[]
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined)

const defaultStars: Star[] = [
  {
    id: 1,
    name: 'ALPHA CENTAURI A',
    x: 15,
    y: 25,
    size: 3,
    color: 'yellow',
    spectralClass: 'G2V',
    temperature: 5790,
    mass: 1.1,
    radius: 1.2,
    magnitude: 0.01,
    planets: 3,
    habitablePlanets: 1,
    distance: 4.37,
    catalogueId: 'HIP 70890',
    surveyProgress: 95
  },
  {
    id: 2,
    name: 'PROXIMA CENTAURI',
    x: 35,
    y: 60,
    size: 2,
    color: 'red',
    spectralClass: 'M5.5Ve',
    temperature: 3042,
    mass: 0.12,
    radius: 0.14,
    magnitude: 11.13,
    planets: 2,
    habitablePlanets: 1,
    distance: 4.24,
    catalogueId: 'GJ 551',
    surveyProgress: 100
  },
  {
    id: 3,
    name: 'KEPLER-442',
    x: 60,
    y: 40,
    size: 4,
    color: 'orange',
    spectralClass: 'K0V',
    temperature: 5200,
    mass: 0.61,
    radius: 0.60,
    magnitude: 9.97,
    planets: 3,
    habitablePlanets: 1,
    distance: 1206,
    catalogueId: 'GL 442A',
    surveyProgress: 84
  },
  {
    id: 4,
    name: 'TRAPPIST-1',
    x: 80,
    y: 70,
    size: 2,
    color: 'red',
    spectralClass: 'M8V',
    temperature: 2511,
    mass: 0.08,
    radius: 0.11,
    magnitude: 18.8,
    planets: 7,
    habitablePlanets: 3,
    distance: 40.7,
    catalogueId: '2MASS J23062928-0502285',
    surveyProgress: 78
  },
  {
    id: 5,
    name: 'TOI-715',
    x: 25,
    y: 80,
    size: 3,
    color: 'cyan',
    spectralClass: 'M4V',
    temperature: 3200,
    mass: 0.43,
    radius: 0.45,
    magnitude: 12.5,
    planets: 2,
    habitablePlanets: 1,
    distance: 137,
    catalogueId: 'TOI-715',
    surveyProgress: 67
  },
  {
    id: 6,
    name: 'HD 40307',
    x: 70,
    y: 20,
    size: 2,
    color: 'purple',
    spectralClass: 'K2.5V',
    temperature: 4977,
    mass: 0.77,
    radius: 0.72,
    magnitude: 7.17,
    planets: 6,
    habitablePlanets: 1,
    distance: 42,
    catalogueId: 'HD 40307',
    surveyProgress: 92
  }
]

export function SpaceProvider({ children }: { children: ReactNode }) {
  const [selectedStar, setSelectedStar] = useState<Star | null>(defaultStars[2]) // Default to Kepler-442
  const [mapState, setMapState] = useState<MapState>({
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    isDragging: false
  })

  return (
    <SpaceContext.Provider value={{
      selectedStar,
      setSelectedStar,
      mapState,
      setMapState,
      stars: defaultStars
    }}>
      {children}
    </SpaceContext.Provider>
  )
}

export function useSpace() {
  const context = useContext(SpaceContext)
  if (context === undefined) {
    throw new Error('useSpace must be used within a SpaceProvider')
  }
  return context
}