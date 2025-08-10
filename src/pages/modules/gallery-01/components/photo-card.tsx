import "./photo-shadows.css";
import { motion } from "motion/react";

interface Photo {
  id: string;
  src: string;
  alt: string;
}

interface PhotoCardProps {
  photo: Photo;
  position?: { x: number; y: number; z?: number };
  rotation?: number;
  translate?: { x: number; y: number };
  zIndex?: number;
  width?: string;
}

export default function PhotoCard({
  photo,
  rotation = 0,
  translate = { x: 0, y: 0 },
  zIndex,
  width = "w-[84px]",
}: PhotoCardProps) {
  return (
    <motion.div
      layoutId={`photo-${photo.id}`}
      key={photo.id}
      className={`overflow-visible transform relative z-0 ${width} photo-shadow`}
      style={
        {
          zIndex: zIndex,
          "--shadow-x": "4px",
          "--shadow-y": "4px",
          "--shadow-blur": "2px",
          "--shadow-skew-x": `${rotation * 0.3}deg`,
          "--shadow-skew-y": `${Math.abs(rotation) * 0.1}deg`,
        } as React.CSSProperties
      }
      initial={false}
      animate={{
        rotate: rotation,
        x: translate.x,
        y: translate.y,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.8,
      }}
    >
      <div className="aspect-square relative bg-[#D4D5D6ff] p-2">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover"
        />

        <div className="p-2"></div>
      </div>
    </motion.div>
  );
}
