import "./photo-shadows.css";
import { ShadowEngine, type PhotoObject } from "./shadow-engine";
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
  shadowEngine?: ShadowEngine;
}

// Global shadow engine instance
const defaultShadowEngine = new ShadowEngine();

export default function PhotoCard({
  photo,
  position = { x: 0, y: 0, z: 5 }, // Default 5px above surface
  rotation = 0,
  translate = { x: 0, y: 0 },
  zIndex,
  width = "w-[120px]",
  shadowEngine = defaultShadowEngine
}: PhotoCardProps) {
  // Create photo object for shadow calculation
  const photoObject: PhotoObject = {
    position: { x: position.x, y: position.y, z: position.z || 5 },
    rotation: rotation,
    size: { width: 120, height: 120 } // Standard photo size
  };

  // Calculate physics-based shadow
  const shadowProps = shadowEngine.calculateShadow(photoObject);
  
  return (
    <motion.div
      layoutId={`photo-${photo.id}`}
      key={photo.id}
      className={`overflow-visible transform relative z-0 ${width} photo-shadow`}
      style={{
        transform: `rotate(${rotation}deg) translate(${translate.x}px, ${translate.y}px)`,
        zIndex: zIndex,
        '--shadow-x': shadowProps.offset.x,
        '--shadow-y': shadowProps.offset.y,
        '--shadow-rotation': shadowProps.rotation,
        '--shadow-opacity': shadowProps.opacity,
        '--shadow-blur': shadowProps.blur,
        '--shadow-color-r': shadowProps.color.r,
        '--shadow-color-g': shadowProps.color.g,
        '--shadow-color-b': shadowProps.color.b,
        '--shadow-spread': shadowProps.spread,
        '--shadow-softness': shadowProps.softness,
        '--penumbra-offset-x': shadowProps.penumbra.offset.x,
        '--penumbra-offset-y': shadowProps.penumbra.offset.y,
        '--penumbra-spread': shadowProps.penumbra.spread,
      } as React.CSSProperties}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.8
      }}
    >
      <div className="aspect-square relative bg-[#D4D5D6ff] p-2">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover"
        />

        <div className="p-2">
          <div className="h-1"></div>
        </div>
      </div>
    </motion.div>
  );
}