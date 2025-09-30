// Color conversion utilities for HCL color space

export interface HCLColor {
  h: number; // Hue: 0-360
  c: number; // Chroma: 0-100
  l: number; // Lightness: 0-100
}

export interface RGBColor {
  r: number; // Red: 0-255
  g: number; // Green: 0-255
  b: number; // Blue: 0-255
}

// Convert HCL to RGB
export function hclToRgb(h: number, c: number, l: number): RGBColor {
  // Convert HCL to LAB
  const hRad = (h * Math.PI) / 180;
  const labA = c * Math.cos(hRad);
  const labB = c * Math.sin(hRad);
  const labL = l;

  // LAB to XYZ conversion
  const fy = (labL + 16) / 116;
  const fx = labA / 500 + fy;
  const fz = fy - labB / 200;

  const delta = 6 / 29;
  const deltaSquared = delta * delta;
  const deltaCubed = delta * delta * delta;

  const xr = fx > delta ? fx * fx * fx : 3 * deltaSquared * (fx - 4 / 29);
  const yr = fy > delta ? fy * fy * fy : 3 * deltaSquared * (fy - 4 / 29);
  const zr = fz > delta ? fz * fz * fz : 3 * deltaSquared * (fz - 4 / 29);

  // D65 illuminant
  const x = xr * 95.047;
  const y = yr * 100.000;
  const z = zr * 108.883;

  // XYZ to sRGB conversion matrix
  let r = (x * 3.2406 + y * -1.5372 + z * -0.4986) / 100;
  let g = (x * -0.9689 + y * 1.8758 + z * 0.0415) / 100;
  let b = (x * 0.0557 + y * -0.2040 + z * 1.0570) / 100;

  // Apply gamma correction (sRGB)
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

  return {
    r: Math.max(0, Math.min(255, Math.round(r * 255))),
    g: Math.max(0, Math.min(255, Math.round(g * 255))),
    b: Math.max(0, Math.min(255, Math.round(b * 255)))
  };
}

// Convert RGB to HCL
export function rgbToHcl(r: number, g: number, b: number): HCLColor {
  // Normalize RGB
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Apply inverse gamma correction (sRGB)
  const rLinear = rNorm > 0.04045 ? Math.pow((rNorm + 0.055) / 1.055, 2.4) : rNorm / 12.92;
  const gLinear = gNorm > 0.04045 ? Math.pow((gNorm + 0.055) / 1.055, 2.4) : gNorm / 12.92;
  const bLinear = bNorm > 0.04045 ? Math.pow((bNorm + 0.055) / 1.055, 2.4) : bNorm / 12.92;

  // sRGB to XYZ conversion matrix
  const x = (rLinear * 0.4124 + gLinear * 0.3576 + bLinear * 0.1805) * 100;
  const y = (rLinear * 0.2126 + gLinear * 0.7152 + bLinear * 0.0722) * 100;
  const z = (rLinear * 0.0193 + gLinear * 0.1192 + bLinear * 0.9505) * 100;

  // XYZ to LAB (D65 illuminant)
  const xr = x / 95.047;
  const yr = y / 100.000;
  const zr = z / 108.883;

  const delta = 6 / 29;
  const deltaSquared = delta * delta;
  const deltaCubed = delta * delta * delta;

  const fx = xr > deltaCubed ? Math.pow(xr, 1/3) : (xr / (3 * deltaSquared) + 4 / 29);
  const fy = yr > deltaCubed ? Math.pow(yr, 1/3) : (yr / (3 * deltaSquared) + 4 / 29);
  const fz = zr > deltaCubed ? Math.pow(zr, 1/3) : (zr / (3 * deltaSquared) + 4 / 29);

  const labL = 116 * fy - 16;
  const labA = 500 * (fx - fy);
  const labB = 200 * (fy - fz);

  // LAB to HCL
  const c = Math.sqrt(labA * labA + labB * labB);
  let h = Math.atan2(labB, labA) * 180 / Math.PI;
  if (h < 0) h += 360;

  return {
    h: Math.max(0, Math.min(360, Math.round(h))),
    c: Math.max(0, Math.min(100, Math.round(c))),
    l: Math.max(0, Math.min(100, Math.round(labL)))
  };
}

// Convert RGB to Hex
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Convert Hex to RGB
export function hexToRgb(hex: string): RGBColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

// Convert HCL to Hex
export function hclToHex(h: number, c: number, l: number): string {
  const rgb = hclToRgb(h, c, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// LAB color interface for internal calculations
interface LABColor {
  l: number; // Lightness: 0-100
  a: number; // Green-Red axis: typically -128 to 127
  b: number; // Blue-Yellow axis: typically -128 to 127
}

// Convert HCL to LAB coordinates
function hclToLab(h: number, c: number, l: number): LABColor {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  
  return { l, a, b };
}

// Convert LAB to HCL coordinates
function labToHcl(l: number, a: number, b: number): HCLColor {
  const c = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * 180 / Math.PI;
  if (h < 0) h += 360;
  
  return {
    h: Math.max(0, Math.min(360, Math.round(h))),
    c: Math.max(0, Math.min(100, Math.round(c))),
    l: Math.max(0, Math.min(100, Math.round(l)))
  };
}

// Mix multiple HCL colors in LAB space for perceptually uniform blending
export function mixHclColors(colors: HCLColor[]): HCLColor {
  if (colors.length === 0) return { h: 0, c: 0, l: 50 };
  if (colors.length === 1) return colors[0];

  // Convert HCL to LAB coordinates
  const labColors = colors.map(hcl => hclToLab(hcl.h, hcl.c, hcl.l));
  
  // Average LAB values for perceptually uniform mixing
  const avgL = labColors.reduce((sum, lab) => sum + lab.l, 0) / labColors.length;
  const avgA = labColors.reduce((sum, lab) => sum + lab.a, 0) / labColors.length;
  const avgB = labColors.reduce((sum, lab) => sum + lab.b, 0) / labColors.length;

  // Convert back to HCL
  return labToHcl(avgL, avgA, avgB);
}