/**
 * Physics-based Shadow Engine
 * Implements real-world light and shadow physics for realistic photo shadows
 */

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface LightSource {
  position: Vector3D;
  intensity: number;
  color: { r: number; g: number; b: number };
  temperature: number; // Kelvin temperature for color temperature
}

export interface PhotoObject {
  position: Vector3D;
  rotation: number; // degrees
  size: { width: number; height: number };
}

export interface ShadowProperties {
  offset: Vector2D;
  opacity: number;
  blur: number;
  rotation: number;
  color: { r: number; g: number; b: number };
  spread: number;
  softness: number;
  penumbra: {
    offset: Vector2D;
    spread: number;
  };
}

export class ShadowEngine {
  private lightSources: LightSource[] = [];
  
  constructor() {
    // Default light source: overhead light, slightly forward
    this.addLightSource({
      position: { x: 0, y: -50, z: 10 },
      intensity: 100,
      color: { r: 1, g: 1, b: 1 },
      temperature: 5500 // Daylight temperature
    });
  }

  addLightSource(light: LightSource): void {
    this.lightSources.push(light);
  }

  clearLightSources(): void {
    this.lightSources = [];
  }

  /**
   * Calculate shadow properties for a photo based on physics
   */
  calculateShadow(photo: PhotoObject): ShadowProperties {
    if (this.lightSources.length === 0) {
      return this.getDefaultShadow();
    }

    // For multiple light sources, combine their effects
    let combinedShadow = this.getDefaultShadow();
    
    for (const light of this.lightSources) {
      const shadowFromLight = this.calculateShadowFromLight(photo, light);
      combinedShadow = this.combineShadows(combinedShadow, shadowFromLight);
    }

    return combinedShadow;
  }

  private calculateShadowFromLight(photo: PhotoObject, light: LightSource): ShadowProperties {
    // Calculate light direction vector (from photo to light)
    const lightDirection = this.normalize({
      x: light.position.x - photo.position.x,
      y: light.position.y - photo.position.y,
      z: light.position.z - photo.position.z
    });

    // Calculate distance for attenuation
    const distance = this.distance3D(photo.position, light.position);
    
    // Inverse square law attenuation
    const attenuation = this.calculateAttenuation(distance, light.intensity);
    
    // Shadow direction (opposite to light direction, projected to 2D)
    const shadowDirection = this.projectShadowTo2D(lightDirection, photo.position.z);
    
    // Shadow distance based on height and light angle
    const shadowDistance = this.calculateShadowDistance(photo.position.z, lightDirection);
    
    // Calculate shadow properties
    const shadowOffset: Vector2D = {
      x: -shadowDirection.x * shadowDistance,
      y: -shadowDirection.y * shadowDistance
    };

    // Shadow opacity with physics-based falloff
    const baseOpacity = 0.3;
    const opacity = Math.max(0.1, baseOpacity * attenuation);

    // Shadow blur increases with distance and height
    const baseBlur = 1;
    const distanceBlur = (distance / 100) * 2; // 2px max additional blur
    const heightBlur = (photo.position.z / 20) * 1.5; // Height-based blur
    const blur = baseBlur + distanceBlur + heightBlur;

    // Shadow rotation influenced by photo rotation and light angle
    const shadowRotation = photo.rotation * 0.7 + this.calculateLightInfluenceOnRotation(lightDirection);

    // Shadow color influenced by light temperature
    const shadowColor = this.calculateShadowColor(light);

    // Shadow spread based on distance and light size
    const spread = Math.min(3, distance / 50); // 0-3px spread
    
    // Shadow softness increases with height and distance
    const softness = Math.min(5, (photo.position.z / 10) + (distance / 100));
    
    // Penumbra calculations for soft shadow edges
    const penumbraOffset: Vector2D = {
      x: shadowOffset.x * 0.8, // Slightly less offset for penumbra
      y: shadowOffset.y * 0.8
    };
    const penumbraSpread = 2 + (distance / 80); // Larger spread for softer edges

    return {
      offset: shadowOffset,
      opacity,
      blur,
      rotation: shadowRotation,
      color: shadowColor,
      spread,
      softness,
      penumbra: {
        offset: penumbraOffset,
        spread: penumbraSpread
      }
    };
  }

  private calculateAttenuation(distance: number, intensity: number): number {
    // Inverse square law with minimum falloff to prevent division by zero
    const minDistance = 10;
    const effectiveDistance = Math.max(distance, minDistance);
    return intensity / (effectiveDistance * effectiveDistance / 1000); // Scaled for UI units
  }

  private projectShadowTo2D(lightDirection: Vector3D, objectHeight: number): Vector2D {
    // Project 3D light direction to 2D shadow on the ground plane
    if (lightDirection.z === 0) {
      return { x: lightDirection.x, y: lightDirection.y };
    }
    
    // Calculate where the shadow ray hits the ground (z = 0)
    const t = objectHeight / -lightDirection.z;
    return {
      x: lightDirection.x * t,
      y: lightDirection.y * t
    };
  }

  private calculateShadowDistance(objectHeight: number, lightDirection: Vector3D): number {
    // Shadow length based on object height and light angle
    const baseDistance = 3;
    const heightFactor = objectHeight / 10; // Scale height influence
    const angleFactor = Math.abs(lightDirection.z) < 0.1 ? 5 : 1 / Math.abs(lightDirection.z);
    
    return baseDistance * (1 + heightFactor) * Math.min(angleFactor, 3);
  }

  private calculateLightInfluenceOnRotation(lightDirection: Vector3D): number {
    // Light angle influences shadow rotation slightly
    const angle = Math.atan2(lightDirection.y, lightDirection.x) * (180 / Math.PI);
    return angle * 0.1; // Subtle influence
  }

  private calculateShadowColor(light: LightSource): { r: number; g: number; b: number } {
    // Cooler shadows for warm lights, warmer shadows for cool lights
    const tempFactor = (light.temperature - 5500) / 1000; // Deviation from neutral
    
    return {
      r: Math.max(0, 0.2 - tempFactor * 0.05), // Slightly blue shadows for warm light
      g: Math.max(0, 0.2 - tempFactor * 0.02),
      b: Math.max(0, 0.2 + tempFactor * 0.05)  // Slightly warm shadows for cool light
    };
  }

  private combineShadows(shadow1: ShadowProperties, shadow2: ShadowProperties): ShadowProperties {
    // Combine multiple shadows (simplified approach)
    return {
      offset: {
        x: (shadow1.offset.x + shadow2.offset.x) * 0.7, // Average with slight reduction
        y: (shadow1.offset.y + shadow2.offset.y) * 0.7
      },
      opacity: Math.min(0.6, shadow1.opacity + shadow2.opacity * 0.5), // Additive but capped
      blur: Math.max(shadow1.blur, shadow2.blur), // Use maximum blur
      rotation: (shadow1.rotation + shadow2.rotation) / 2, // Average rotation
      color: {
        r: (shadow1.color.r + shadow2.color.r) / 2,
        g: (shadow1.color.g + shadow2.color.g) / 2,
        b: (shadow1.color.b + shadow2.color.b) / 2
      },
      spread: Math.max(shadow1.spread, shadow2.spread), // Use maximum spread
      softness: (shadow1.softness + shadow2.softness) / 2, // Average softness
      penumbra: {
        offset: {
          x: (shadow1.penumbra.offset.x + shadow2.penumbra.offset.x) / 2,
          y: (shadow1.penumbra.offset.y + shadow2.penumbra.offset.y) / 2
        },
        spread: Math.max(shadow1.penumbra.spread, shadow2.penumbra.spread)
      }
    };
  }

  // Utility functions
  private normalize(vector: Vector3D): Vector3D {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    if (length === 0) return { x: 0, y: 0, z: 0 };
    
    return {
      x: vector.x / length,
      y: vector.y / length,
      z: vector.z / length
    };
  }

  private distance3D(a: Vector3D, b: Vector3D): number {
    return Math.sqrt(
      Math.pow(b.x - a.x, 2) + 
      Math.pow(b.y - a.y, 2) + 
      Math.pow(b.z - a.z, 2)
    );
  }

  private getDefaultShadow(): ShadowProperties {
    return {
      offset: { x: 0, y: 2 },
      opacity: 0.2,
      blur: 1,
      rotation: 0,
      color: { r: 0.2, g: 0.2, b: 0.2 },
      spread: 0,
      softness: 1,
      penumbra: {
        offset: { x: 0, y: 1 },
        spread: 2
      }
    };
  }
}