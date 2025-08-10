import PhotoCard from "./photo-card";

interface Photo {
  id: string;
  src: string;
  alt: string;
  date: string;
}

interface PhotoTimelineViewProps {
  photos: Photo[];
}

export default function PhotoTimelineView({ photos }: PhotoTimelineViewProps) {
  const groupedPhotos = photos.reduce(
    (acc, photo) => {
      const date = photo.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(photo);
      return acc;
    },
    {} as Record<string, Photo[]>,
  );

  const formatDate = (dateStr: string) => {
    const [day, month] = dateStr.split(" ");
    return { day, month };
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      {Object.entries(groupedPhotos).map(([date, datePhotos]) => {
        const { day, month } = formatDate(date);
        return (
          <div key={date} className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-orange-500 font-medium">Yesterday</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">{day}</span>
                <span className="text-gray-500">{month}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 overflow-x-visible pb-2">
              {datePhotos.map((photo, index) => {
                return (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    rotation={index % 2 === 0 ? -2 : 2}
                    width="w-[120px] flex-shrink-0"
                    lightSource={{ x: 0, y: -20 }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
