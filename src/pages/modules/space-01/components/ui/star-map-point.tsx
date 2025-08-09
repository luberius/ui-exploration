import "../css/star-map-point.css";

interface StarMapPointProps {
  x: number;
  y: number;
  size?: number;
  color?:
    | "blue"
    | "white"
    | "yellow"
    | "red"
    | "cyan"
    | "purple"
    | "orange"
    | "green"
    | "indigo"
    | "pink";
  selected?: boolean;
  label?: string;
  sublabel?: string;
  onClick?: () => void;
  className?: string;
}

export default function StarMapPoint({
  x,
  y,
  size = 3,
  color = "white",
  selected = false,
  label,
  sublabel,
  onClick,
  className = "",
}: StarMapPointProps) {
  return (
    <div
      className={`space-star-point ${className}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      onClick={onClick}
    >
      {/* Star glow */}
      <div
        className={`space-star-glow space-star--${color}`}
        style={{
          width: `${size * 4}px`,
          height: `${size * 4}px`,
          left: `${-size * 1.5}px`,
          top: `${-size * 1.5}px`,
        }}
      />

      {/* Star core */}
      <div
        className={`space-star-core space-star--${color}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />

      {/* Selection indicator */}
      {selected && (
        <>
          <div
            className="space-star-selection-ring"
            style={{
              width: `${size * 8}px`,
              height: `${size * 8}px`,
              left: `${-size * 3.5}px`,
              top: `${-size * 3.5}px`,
            }}
          />
          <div
            className="space-star-selection-ring--inner"
            style={{
              width: `${size * 6}px`,
              height: `${size * 6}px`,
              left: `${-size * 2.5}px`,
              top: `${-size * 2.5}px`,
            }}
          />
        </>
      )}

      {/* Tooltip - always shown when selected, hover for others */}
      {(label || sublabel) && (
        <div
          className={`space-star-tooltip ${
            selected
              ? "space-star-tooltip--visible"
              : "space-star-tooltip--hidden"
          }`}
        >
          <div className="space-star-tooltip-content">
            {label && <div className="space-star-tooltip-label">{label}</div>}
            {sublabel && (
              <div className="space-star-tooltip-sublabel">{sublabel}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
