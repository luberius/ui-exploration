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
    { x: 120, y: 80, z: 8, rotation: -12 }, // Top left - slightly elevated
    { x: 160, y: 70, z: 3, rotation: 8 }, // Top center - overlapping left
    { x: 200, y: 90, z: 6, rotation: -5 }, // Top right - overlapping center
    { x: 100, y: 130, z: 12, rotation: 15 }, // Mid left - overlapping top
    { x: 140, y: 120, z: 2, rotation: -8 }, // Center - overlapping everything
    { x: 180, y: 140, z: 7, rotation: 12 }, // Mid right - overlapping center
    { x: 120, y: 180, z: 10, rotation: -15 }, // Bottom left - overlapping mid
    { x: 160, y: 170, z: 4, rotation: 6 }, // Bottom center - overlapping left
    { x: 200, y: 190, z: 9, rotation: -10 }, // Bottom right - overlapping center
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] space-y-8 px-4">
      <div className="relative w-[320px] h-[270px]">
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
