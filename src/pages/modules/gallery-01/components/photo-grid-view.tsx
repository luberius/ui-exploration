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
  // Predefined scattered positions for natural photo placement
  const scatterPositions = [
    { x: 120, y: 80, rotation: -12 },   // Top left
    { x: 280, y: 40, rotation: 8 },     // Top center
    { x: 420, y: 90, rotation: -5 },    // Top right
    { x: 80, y: 180, rotation: 15 },    // Mid left
    { x: 240, y: 160, rotation: -8 },   // Center
    { x: 400, y: 200, rotation: 12 },   // Mid right
    { x: 160, y: 280, rotation: -15 },  // Bottom left
    { x: 320, y: 260, rotation: 6 },    // Bottom center
    { x: 440, y: 320, rotation: -10 },  // Bottom right
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] space-y-8">
      <div className="relative w-[600px] h-[400px]">
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
                rotation={position.rotation}
                zIndex={photos.length - index}
                lightSource={{ x: 300, y: -20 }} // Center light source
                width="w-[120px]"
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
