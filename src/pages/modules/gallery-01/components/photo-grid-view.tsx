import PhotoCard from "./photo-card";

interface Photo {
  id: string;
  src: string;
  alt: string;
}

interface PhotoGridViewProps {
  photos: Photo[];
}

export default function PhotoGridView({ photos }: PhotoGridViewProps) {
  // Predefined scattered positions with 3D coordinates
  const scatterPositions = [
    { x: 84, y: 56, z: 8, rotation: -12 }, // Top left - slightly elevated
    { x: 196, y: 28, z: 3, rotation: 8 }, // Top center - closer to surface
    { x: 294, y: 63, z: 6, rotation: -5 }, // Top right
    { x: 56, y: 126, z: 12, rotation: 15 }, // Mid left - more elevated
    { x: 168, y: 112, z: 2, rotation: -8 }, // Center - almost flat
    { x: 280, y: 140, z: 7, rotation: 12 }, // Mid right
    { x: 112, y: 196, z: 10, rotation: -15 }, // Bottom left - elevated
    { x: 224, y: 182, z: 4, rotation: 6 }, // Bottom center
    { x: 308, y: 224, z: 9, rotation: -10 }, // Bottom right
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] space-y-8 px-4">
      <div className="relative w-[420px] h-[280px]">
        {photos.slice(0, 9).map((photo, index) => {
          const position = scatterPositions[index];
          return (
            <div
              key={photo.id}
              className="absolute"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: photos.length - index,
              }}
            >
              <PhotoCard
                photo={photo}
                position={{ x: position.x, y: position.y, z: position.z }}
                rotation={position.rotation}
                zIndex={photos.length - index}
                width="w-[84px]"
              />
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-lg text-gray-500">A lot happened last week.</p>
      </div>
    </div>
  );
}
