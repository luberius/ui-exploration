import PhotoCard from "./photo-card";
import { motion } from "motion/react";
import { animationConfig } from "./animation-config";

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

  const getRelativeDate = (dateStr: string) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    // For demo, assuming dateStr format is like "12 Jan"
    const [day, month] = dateStr.split(" ");
    const currentYear = today.getFullYear();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = monthNames.indexOf(month);
    
    const photoDate = new Date(currentYear, monthIndex, parseInt(day));
    
    const diffTime = today.getTime() - photoDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4 px-4">
      {Object.entries(groupedPhotos).map(([date, datePhotos]) => {
        const { day, month } = formatDate(date);
        return (
          <div key={date} className="space-y-4">
            <motion.div 
              className="space-y-1"
              initial={animationConfig.entrance.timeline.dateGroup.initial}
              animate={animationConfig.entrance.timeline.dateGroup.animate}
              exit={animationConfig.exit.timeline.dateGroup}
              transition={{
                duration: animationConfig.stagger.timeline.duration * 0.8,
                delay: 0.05 * 0.8
              }}
            >
              <motion.h3 
                className="text-orange-500 font-medium"
                initial={animationConfig.entrance.timeline.dateHeader.initial}
                animate={animationConfig.entrance.timeline.dateHeader.animate}
                transition={{
                  duration: 0.3 * 0.8,
                  delay: 0.1 * 0.8
                }}
              >
                {getRelativeDate(date)}
              </motion.h3>
              <motion.div 
                className="flex items-baseline space-x-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3 * 0.8,
                  delay: 0.15 * 0.8
                }}
              >
                <motion.span 
                  className="text-2xl font-bold text-gray-900"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4 * 0.8,
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                    delay: 0.2 * 0.8
                  }}
                >
                  {day}
                </motion.span>
                <motion.span 
                  className="text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3 * 0.8,
                    delay: 0.25 * 0.8
                  }}
                >
                  {month}
                </motion.span>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-4 gap-0 overflow-x-visible pb-2">
              {datePhotos.map((photo, index) => {
                const baseX = index * 98; // Spacing between photos (30% smaller)
                return (
                  <div 
                    key={photo.id}
                    className={index > 0 ? "-ml-[3px]" : ""}
                  >
                    <PhotoCard
                      photo={photo}
                      position={{ 
                        x: baseX, 
                        y: 0, 
                        z: 4 + Math.random() * 3 // Slight random height variation
                      }}
                      rotation={(Math.random() - 0.5) * 10} // Random rotation between -5 and 5 degrees
                      width="w-[84px] flex-shrink-0"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
