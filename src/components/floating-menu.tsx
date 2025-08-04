import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { MoreVertical, Home, BarChart3, MapPin, Rocket } from "lucide-react";
import { motion, useMotionValue, animate } from "motion/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
import { useTheme } from "../hooks/use-theme";
import { cn } from "../lib/utils";

interface FloatingMenuProps {
  routes: {
    path: string;
    label: string;
    icon: string;
  }[];
}

const iconMap = {
  "🏠": Home,
  "📊": BarChart3,
  "📍": MapPin,
  "🚀": Rocket,
};

export default function FloatingMenu({ routes }: FloatingMenuProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showGrabCursor, setShowGrabCursor] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHomePage = location.pathname === "/";

  // Set initial position and constraints
  useEffect(() => {
    if (typeof window !== "undefined") {
      const padding = 32;
      const buttonSize = 40; // 10 * 4 = 40px (h-10 w-10)

      // Set drag constraints with 32px padding from all edges
      setDragConstraints({
        top: padding,
        left: padding,
        right: window.innerWidth - buttonSize - padding,
        bottom: window.innerHeight - buttonSize - padding,
      });

      const homeX = (window.innerWidth - buttonSize) / 2;
      const homeY = window.innerHeight / 2 + 114;
      const defaultX = window.innerWidth - buttonSize - padding;
      const defaultY = window.innerHeight - buttonSize - padding;

      if (!isInitialized) {
        // Set initial position without animation
        if (isHomePage) {
          x.set(homeX);
          y.set(homeY);
        } else {
          x.set(defaultX);
          y.set(defaultY);
        }
        setIsInitialized(true);
      } else {
        // Animate position change when route changes
        if (isHomePage) {
          animate(x, homeX, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          });
          animate(y, homeY, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          });
        } else {
          animate(x, defaultX, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          });
          animate(y, defaultY, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          });
        }
      }
    }
  }, [x, y, isHomePage, isInitialized]);

  // Update constraints on window resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const padding = 32;
        const buttonSize = 40;

        setDragConstraints({
          top: padding,
          left: padding,
          right: window.innerWidth - buttonSize - padding,
          bottom: window.innerHeight - buttonSize - padding,
        });

        // Reposition on homepage when window resizes
        if (isHomePage) {
          x.set((window.innerWidth - buttonSize) / 2);
          y.set(window.innerHeight / 2 + 114);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHomePage, x, y]);

  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true);
    setHasDragged(false);
    setIsOpen(false); // Close popover when drag starts
  };

  // Handle drag movement
  const handleDrag = () => {
    setHasDragged(true);
  };

  // Handle drag end - no more snapping, just reset state
  const handleDragEnd = () => {
    setIsDragging(false);
    // Reset drag flag after a short delay to prevent immediate popover opening
    setTimeout(() => setHasDragged(false), 100);
  };

  // Handle button click - only open if not dragging
  const handleButtonClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setIsOpen(!isOpen);
  };

  // Handle mouse down with delay for cursor change
  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      setShowGrabCursor(true);
    }, 150);

    const handleMouseUp = () => {
      clearTimeout(timer);
      setShowGrabCursor(false);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragMomentum={false}
        whileDrag={{ scale: 1.1, opacity: 1, rotateZ: 2 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ x, y }}
        className="absolute pointer-events-auto"
      >
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger
            className={cn(
              "h-10 w-10 rounded-full inline-flex items-center justify-center transition-all duration-200 backdrop-blur-xs border",
              showGrabCursor ? "cursor-grabbing" : "cursor-default",
              isDragging &&
                "bg-white/30 dark:bg-black/40 shadow-xl border-white/40 dark:border-white/20",
              !isDragging &&
                "bg-white/20 dark:bg-white/5 hover:bg-white/25 dark:hover:bg-black/40 shadow-lg hover:shadow-xl border-white/30 dark:border-white/10 hover:border-white/50 dark:hover:border-white/20",
            )}
            onClick={handleButtonClick}
            onMouseDown={handleMouseDown}
          >
            <div
              className="relative h-5 w-5 transition-all duration-200"
              style={{
                background:
                  "linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981, #f59e0b)",
                WebkitMaskImage: "url(/src/assets/rocket.svg)",
                maskImage: "url(/src/assets/rocket.svg)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                filter: isDragging
                  ? "drop-shadow(0 0 8px rgba(139,92,246,0.8)) drop-shadow(0 0 12px rgba(6,182,212,0.6))"
                  : "drop-shadow(0 0 4px rgba(139,92,246,0.6))",
              }}
            />
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            className="w-36 p-1"
            sideOffset={4}
          >
            <div className="space-y-0.5">
              {routes.map((route) => {
                const IconComponent =
                  iconMap[route.icon as keyof typeof iconMap] || MoreVertical;

                return (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="h-3 w-3" />
                    {route.label}
                  </NavLink>
                );
              })}
              <div className="border-t border-border my-1" />
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-xs text-muted-foreground">Dark mode</span>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  className="scale-75"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </motion.div>
    </div>
  );
}
