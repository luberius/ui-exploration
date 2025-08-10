# 🌟 Physics-Based Shadow Engine - Tweaking Guide

A comprehensive guide to customizing the realistic shadow system for your photo gallery.

## 📋 Table of Contents

- [Light Source Configuration](#-light-source-configuration)
- [Photo Positioning](#-photo-positioning)
- [Shadow Physics Constants](#-shadow-physics-constants)
- [Shadow Appearance](#-shadow-appearance)
- [CSS Fine-Tuning](#-css-fine-tuning)
- [Quick Tweaking Tips](#-quick-tweaking-tips)
- [Common Presets](#-common-presets)
- [Debugging](#-debugging)

## 💡 Light Source Configuration

**File**: `photo-grid-view.tsx` (lines 18-23)

```typescript
shadowEngine.addLightSource({
  position: { x: 300, y: 200, z: -100 }, // Light position in 3D space
  intensity: 150,                         // Light strength (50-300)
  color: { r: 1, g: 0.95, b: 0.9 },     // RGB color values (0-1)
  temperature: 5200                       // Color temperature in Kelvin
});
```

### Tweakable Parameters

| Parameter | Range | Effect |
|-----------|--------|--------|
| `position.x` | 0-600px | Horizontal light position |
| `position.y` | 0-400px | Vertical light position |
| `position.z` | -200 to 50px | Height (negative = above) |
| `intensity` | 50-300 | Shadow strength |
| `temperature` | 3000-7000K | Warm (3000) to Cool (7000) |

## 📍 Photo Positioning

**File**: `photo-grid-view.tsx` (lines 26-36)

```typescript
const scatterPositions = [
  { x: 120, y: 80, z: 8, rotation: -12 },   // Top left - elevated
  { x: 280, y: 40, z: 3, rotation: 8 },     // Top center - close to surface
  // ... more positions
];
```

### Position Parameters

| Parameter | Range | Effect |
|-----------|--------|--------|
| `x, y` | 0-600px | Screen coordinates |
| `z` | 2-15px | Height above surface |
| `rotation` | -20° to +20° | Photo angle |

## ⚗️ Shadow Physics Constants

**File**: `shadow-engine.ts`

### Shadow Spread (Line 127)
```typescript
const spread = Math.min(3, distance / 50);
//                           ↑
// Change this value: Lower = tighter shadows, Higher = more spread
```

### Shadow Softness (Line 130)
```typescript
const softness = Math.min(5, (photo.position.z / 10) + (distance / 100));
//                                              ↑              ↑
// Height factor: Lower = less height influence    Distance factor
```

### Penumbra Spread (Line 137)
```typescript
const penumbraSpread = 2 + (distance / 80);
//                     ↑              ↑
//                Base size    Distance divisor (lower = more spread)
```

## 🎨 Shadow Appearance

**File**: `shadow-engine.ts` (lines 111-118)

### Base Properties
```typescript
const baseOpacity = 0.3;     // Shadow darkness (0.1-0.5)
const baseBlur = 1;          // Minimum blur (0.5-3)
const distanceBlur = (distance / 100) * 2;    // Distance blur factor
const heightBlur = (photo.position.z / 20) * 1.5;  // Height blur factor
```

### Attenuation Formula (Line 156)
```typescript
return intensity / (effectiveDistance * effectiveDistance / 1000);
//                                                          ↑
// Scale factor: Higher = stronger shadows, Lower = weaker shadows
```

## 🎛️ CSS Fine-Tuning

**File**: `photo-shadows.css`

### Main Shadow Size
```css
/* Lines 7-8 */
width: calc(100% + var(--shadow-spread, 0) * 1px);
height: calc(100% + var(--shadow-spread, 0) * 1px);
```

### Penumbra (Soft Edge) Size
```css
/* Lines 31-32 */
width: calc(100% + var(--penumbra-spread, 4) * 1px);
height: calc(100% + var(--penumbra-spread, 4) * 1px);
```

### Shadow Color Formula
```css
/* Lines 9-13 */
background: rgba(
  calc(var(--shadow-color-r, 0.2) * 255),
  calc(var(--shadow-color-g, 0.2) * 255),
  calc(var(--shadow-color-b, 0.2) * 255),
  var(--shadow-opacity, 0.3)
);
```

## 🛠️ Quick Tweaking Tips

### Make Shadows Stronger
1. ⬆️ Increase light `intensity: 200+`
2. ⬆️ Increase `baseOpacity: 0.4`
3. ⬇️ Decrease light `z` position (bring closer to photos)
4. ⬇️ Lower attenuation scale: `/800` instead of `/1000`

### Make Shadows Softer
1. ⬆️ Increase `baseBlur: 2`
2. ⬇️ Decrease penumbra divisor: `/60` instead of `/80`
3. ⬆️ Add more `z` height variation to photos
4. ⬆️ Increase `penumbraSpread` base value

### Change Shadow Direction
1. 📍 Move light `x, y` position
2. 📐 Adjust light `z` for casting angle
3. 🔄 Modify photo rotations for variety

### Optimize Performance
1. 🎯 Use fewer light sources (1-2 max)
2. ⚡ Keep blur values reasonable (1-4px)
3. 🔢 Limit shadow calculations to visible photos

## 🎯 Common Presets

### Realistic Daylight
```typescript
{
  position: { x: 300, y: 100, z: -120 },
  intensity: 120,
  temperature: 5500,
  baseOpacity: 0.25
}
```

### Warm Indoor Lighting
```typescript
{
  position: { x: 200, y: 50, z: -80 },
  intensity: 80,
  temperature: 3200,
  baseOpacity: 0.35
}
```

### Cool Studio Lighting
```typescript
{
  position: { x: 350, y: 150, z: -150 },
  intensity: 150,
  temperature: 6500,
  baseOpacity: 0.3
}
```

### Dramatic Side Lighting
```typescript
{
  position: { x: 100, y: 200, z: -60 },
  intensity: 250,
  temperature: 4000,
  baseOpacity: 0.45
}
```

### Soft Overhead Lighting
```typescript
{
  position: { x: 300, y: 200, z: -200 },
  intensity: 100,
  temperature: 5000,
  baseOpacity: 0.2
}
```

## 🐛 Debugging

### Add Debug Logging
```typescript
// In shadow-engine.ts, add to calculateShadow method:
console.log('Light position:', light.position);
console.log('Photo position:', photo.position);
console.log('Shadow properties:', shadowProps);
```

### Visual Debug Helper
```typescript
// Add this to PhotoCard component for visual debugging:
const debugStyle = {
  '--debug-light-x': lightSource.x,
  '--debug-light-y': lightSource.y,
  // Add visual indicators in CSS
};
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Shadows too weak | Increase `intensity` or `baseOpacity` |
| Shadows misaligned | Check light `position` and photo `z` values |
| Shadows too blurry | Decrease `blur` factors or `penumbra` spread |
| Performance issues | Reduce light sources, limit blur values |

## 📝 Notes

- **Units**: All positions are in pixels relative to container
- **Z-axis**: Negative values are above the surface (where lights should be)
- **Performance**: Each light source adds computational overhead
- **Browser Support**: Uses modern CSS custom properties

---

**💡 Pro Tip**: Start with small adjustments (±10-20% of current values) and test iteratively for best results.