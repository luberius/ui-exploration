import "./photo-shadows.css";

interface Photo {
  id: string;
  src: string;
  alt: string;
}

interface PhotoCardProps {
  photo: Photo;
  rotation?: number;
  translate?: { x: number; y: number };
  zIndex?: number;
  width?: string;
  lightSource?: { x: number; y: number };
}

function calculateShadow(rotation: number, lightSource: { x: number; y: number }) {
  // Convert rotation to radians
  const rotationRad = (rotation * Math.PI) / 180;
  
  // Light source relative to photo center (assuming 120px photo)
  const photoCenter = { x: 60, y: 60 };
  const lightVector = {
    x: lightSource.x - photoCenter.x,
    y: lightSource.y - photoCenter.y
  };
  
  // Calculate shadow offset based on light direction and photo rotation
  // The shadow appears opposite to the light direction
  const baseDistance = 3; // Base shadow distance
  const shadowDistance = Math.sqrt(lightVector.x ** 2 + lightVector.y ** 2) * 0.03;
  
  // Shadow offset (opposite to light direction)
  const shadowX = -Math.sign(lightVector.x) * Math.min(shadowDistance, baseDistance);
  const shadowY = -Math.sign(lightVector.y) * Math.min(shadowDistance, baseDistance) + 2; // Always cast down slightly
  
  // Shadow rotation follows photo rotation but slightly offset
  const shadowRotation = rotation * 0.8;
  
  // Shadow opacity based on distance from light
  const maxDistance = 200;
  const distance = Math.min(Math.sqrt(lightVector.x ** 2 + lightVector.y ** 2), maxDistance);
  const opacity = 0.15 + (distance / maxDistance) * 0.25; // 0.15 to 0.4
  
  // Shadow blur increases with distance from light (softer shadows when further)
  const blur = 1 + (distance / maxDistance) * 2; // 1px to 3px blur
  
  return {
    x: shadowX,
    y: shadowY,
    rotation: shadowRotation,
    opacity: opacity,
    blur: blur
  };
}

export default function PhotoCard({
  photo,
  rotation = 0,
  translate = { x: 0, y: 0 },
  zIndex,
  width = "w-[120px]",
  lightSource = { x: 0, y: -20 } // Default: light from top-center, 20px above
}: PhotoCardProps) {
  const shadow = calculateShadow(rotation, lightSource);
  
  return (
    <div
      key={photo.id}
      className={`overflow-visible transform relative z-0 ${width} photo-shadow`}
      style={{
        transform: `rotate(${rotation}deg) translate(${translate.x}px, ${translate.y}px)`,
        zIndex: zIndex,
        '--shadow-x': shadow.x,
        '--shadow-y': shadow.y,
        '--shadow-rotation': shadow.rotation,
        '--shadow-opacity': shadow.opacity,
        '--shadow-blur': shadow.blur,
      } as React.CSSProperties}
    >
      <div className="aspect-square relative bg-[#D4D5D6ff] p-2">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover"
        />

        <div className="p-2">
          <div className="h-1"></div>
        </div>
      </div>
    </div>
  );
}