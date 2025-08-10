// Animation configuration for gallery transitions
export const animationConfig = {
  // Hero animation (layoutId transitions) - for photo cards
  hero: {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
    mass: 0.8,
    duration: 0.6,
  },

  // View transition animations
  viewTransition: {
    duration: 0.3,
    ease: "easeInOut" as const,
  },

  // Stagger animations for multiple items
  stagger: {
    grid: {
      delayIncrement: 0.05, // Delay between each photo in grid
      duration: 0.4,
      type: "spring" as const,
      damping: 15,
      stiffness: 200,
    },
    timeline: {
      groupDelayIncrement: 0.1, // Delay between each date group
      itemDelayIncrement: 0.05, // Delay between items within a group
      duration: 0.4,
      type: "spring" as const,
      damping: 15,
      stiffness: 200,
    },
  },

  // Entry animations
  entrance: {
    grid: {
      container: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      },
      containerInner: {
        initial: { scale: 0.9 },
        animate: { scale: 1 },
        transition: { delay: 0.1, duration: 0.4, type: "spring" as const },
      },
      items: {
        initial: { opacity: 0, scale: 0.8, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
      },
      caption: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.5, duration: 0.3 },
      },
    },
    timeline: {
      container: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      },
      dateGroup: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      },
      dateHeader: {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
      },
      photoGrid: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      },
      photoItem: {
        initial: { opacity: 0, scale: 0.8, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
      },
    },
  },

  // Exit animations
  exit: {
    grid: {
      container: {
        opacity: 0,
        transition: { duration: 0.3 },
      },
      items: {
        opacity: 0,
        scale: 0.8,
        // Reverse stagger - last items exit first
        transition: { duration: 0.2 },
      },
    },
    timeline: {
      container: {
        opacity: 0,
        transition: { duration: 0.3 },
      },
      dateGroup: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.2 },
      },
      photoItem: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 },
      },
    },
  },

  // Layout animation (for repositioning elements)
  layout: {
    type: "spring" as const,
    damping: 25,
    stiffness: 400,
    mass: 1,
  },
};

// Helper functions for calculating stagger delays
export const getStaggerDelay = (index: number, config: { delayIncrement: number, baseDelay?: number }) => {
  return (config.baseDelay || 0) + index * config.delayIncrement;
};

export const getReverseStaggerDelay = (
  index: number, 
  totalItems: number, 
  config: { delayIncrement: number, baseDelay?: number }
) => {
  return (config.baseDelay || 0) + (totalItems - index - 1) * config.delayIncrement;
};