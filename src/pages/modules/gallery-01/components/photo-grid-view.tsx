interface Photo {
  id: string
  src: string
  alt: string
}

interface PhotoGridViewProps {
  photos: Photo[]
}

export default function PhotoGridView({ photos }: PhotoGridViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8">
      <div className="relative">
        <div className="grid grid-cols-3 gap-4 max-w-lg">
          {photos.slice(0, 9).map((photo, index) => (
            <div
              key={photo.id}
              className="bg-white shadow-lg rounded-sm overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300"
              style={{
                transform: `rotate(${(index % 3 - 1) * 5}deg) translate(${(index % 2) * 10}px, ${Math.floor(index / 3) * 5}px)`,
                zIndex: photos.length - index
              }}
            >
              <div className="aspect-square bg-gray-200 relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white p-2">
                <div className="h-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-lg text-gray-500">A lot happened last week.</p>
      </div>
    </div>
  )
}