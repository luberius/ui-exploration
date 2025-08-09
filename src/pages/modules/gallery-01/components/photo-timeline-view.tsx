interface Photo {
  id: string
  src: string
  alt: string
  date: string
}

interface PhotoTimelineViewProps {
  photos: Photo[]
}

export default function PhotoTimelineView({ photos }: PhotoTimelineViewProps) {
  const groupedPhotos = photos.reduce((acc, photo) => {
    const date = photo.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(photo)
    return acc
  }, {} as Record<string, Photo[]>)

  const formatDate = (dateStr: string) => {
    const [day, month] = dateStr.split(' ')
    return { day, month }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      {Object.entries(groupedPhotos).map(([date, datePhotos]) => {
        const { day, month } = formatDate(date)
        return (
          <div key={date} className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-orange-500 font-medium">Yesterday</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">{day}</span>
                <span className="text-gray-500">{month}</span>
              </div>
            </div>
            
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {datePhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="bg-white shadow-lg rounded-sm overflow-hidden flex-shrink-0 transform hover:scale-105 transition-transform duration-300"
                  style={{
                    transform: `rotate(${(index % 2 === 0 ? -2 : 2)}deg)`,
                  }}
                >
                  <div className="w-32 h-32 bg-gray-200 relative">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white p-2">
                    <div className="h-3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}