import { useState } from "react"
import { Button } from "@/components/ui/button"
import PhotoGridView from "./components/photo-grid-view"
import PhotoTimelineView from "./components/photo-timeline-view"

interface Photo {
  id: string
  src: string
  alt: string
  date: string
}

const mockPhotos: Photo[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", alt: "Mountain landscape", date: "7 June" },
  { id: "2", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop", alt: "Portrait", date: "7 June" },
  { id: "3", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", alt: "Man portrait", date: "7 June" },
  { id: "4", src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop", alt: "Dog", date: "6 June" },
  { id: "5", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", alt: "Woman portrait", date: "6 June" },
  { id: "6", src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop", alt: "Dog close-up", date: "6 June" },
  { id: "7", src: "https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?w=400&h=400&fit=crop", alt: "Vintage car", date: "6 June" },
  { id: "8", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", alt: "Man in red shirt", date: "5 June" },
  { id: "9", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", alt: "Woman smiling", date: "5 June" },
]

export default function Gallery01() {
  const [view, setView] = useState<"grid" | "timeline">("grid")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          <h1 className="text-3xl font-bold">Gallery</h1>
          <Button 
            variant={view === "timeline" ? "default" : "outline"}
            onClick={() => setView(view === "grid" ? "timeline" : "grid")}
          >
            {view === "grid" ? "Show Timeline" : "Show Grid"}
          </Button>
        </div>
        
        {view === "grid" ? (
          <PhotoGridView photos={mockPhotos} />
        ) : (
          <PhotoTimelineView photos={mockPhotos} />
        )}
      </div>
    </div>
  )
}