import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhotoGridView from "./components/photo-grid-view";
import PhotoTimelineView from "./components/photo-timeline-view";

interface Photo {
  id: string;
  src: string;
  alt: string;
  date: string;
}

const mockPhotos: Photo[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    alt: "Mountain landscape",
    date: "9 Aug",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    alt: "Portrait",
    date: "9 Aug",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    alt: "Man portrait",
    date: "9 Aug",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop",
    alt: "Dog",
    date: "8 Aug",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    alt: "Woman portrait",
    date: "8 Aug",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
    alt: "Dog close-up",
    date: "8 Aug",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?w=400&h=400&fit=crop",
    alt: "Vintage car",
    date: "8 Aug",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    alt: "Man in red shirt",
    date: "7 Aug",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    alt: "Woman smiling",
    date: "7 Aug",
  },
];

export default function Gallery01() {
  const [view, setView] = useState<"grid" | "timeline">("grid");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {/* iPhone-style mobile container */}
      <div className="relative">
        {/* Device outer frame */}
        <div className="bg-black rounded-[2.5rem] p-1 shadow-2xl">
          {/* Device screen */}
          <div className="bg-gray-50 rounded-[2.2rem] overflow-hidden w-[375px] h-[812px] relative">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black rounded-full w-[126px] h-[30px] z-50"></div>
            
            {/* Screen content */}
            <div className="h-full overflow-hidden pt-12 pb-8 flex flex-col">
              <div className="flex-1 overflow-auto">
                {view === "grid" ? (
                  <PhotoGridView photos={mockPhotos} />
                ) : (
                  <PhotoTimelineView photos={mockPhotos} />
                )}
              </div>

              {/* Bottom button */}
              <div className="pt-4 px-4 flex justify-center">
                <Button
                  onClick={() => setView(view === "grid" ? "timeline" : "grid")}
                  className="text-xs px-4 py-2 rounded-full"
                >
                  {view === "grid" ? "Timeline" : "Grid"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
