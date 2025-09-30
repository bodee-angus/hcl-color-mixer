import { useState } from "react";
import { X, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ColorSlider } from "./ColorSlider";
import { HCLColor, hclToHex, hclToRgb } from "../utils/colorUtils";
import { toast } from "sonner@2.0.3";

interface ColorCardProps {
  color: HCLColor;
  onColorChange: (color: HCLColor) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function ColorCard({ color, onColorChange, onRemove, canRemove }: ColorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const hex = hclToHex(color.h, color.c, color.l);
  const rgb = hclToRgb(color.h, color.c, color.l);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${text} to clipboard`);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleHueChange = (h: number) => {
    onColorChange({ ...color, h });
  };

  const handleChromaChange = (c: number) => {
    onColorChange({ ...color, c });
  };

  const handleLightnessChange = (l: number) => {
    onColorChange({ ...color, l });
  };

  return (
    <Card 
      className="p-6 relative transition-all duration-200 hover:shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {canRemove && (
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 h-8 w-8 p-0 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      <div className="space-y-6">
        {/* Color Preview */}
        <div className="space-y-3">
          <div 
            className="w-full h-24 rounded-xl border border-gray-200/50 shadow-sm"
            style={{ backgroundColor: hex }}
          />
          
          {/* Hex Value - Clickable */}
          <div 
            className="text-center cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 select-all"
            onClick={() => copyToClipboard(hex)}
            title="Click to copy hex value"
          >
            <span className="font-mono tracking-wider">{hex}</span>
            <Copy className="inline-block w-3 h-3 ml-2 opacity-50" />
          </div>
        </div>

        {/* HCL Sliders */}
        <div className="space-y-5">
          <ColorSlider
            label="Hue"
            value={color.h}
            min={0}
            max={360}
            onChange={handleHueChange}
            unit="°"
          />
          
          <ColorSlider
            label="Chroma"
            value={color.c}
            min={0}
            max={100}
            onChange={handleChromaChange}
            unit="%"
          />
          
          <ColorSlider
            label="Lightness"
            value={color.l}
            min={0}
            max={100}
            onChange={handleLightnessChange}
            unit="%"
          />
        </div>

        {/* RGB Values - Clickable */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
          {[
            { label: 'R', value: rgb.r },
            { label: 'G', value: rgb.g },
            { label: 'B', value: rgb.b }
          ].map(({ label, value }) => (
            <div 
              key={label}
              className="text-center cursor-pointer px-2 py-1 rounded hover:bg-gray-50 transition-colors duration-150"
              onClick={() => copyToClipboard(value.toString())}
              title={`Click to copy ${label} value`}
            >
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="font-mono text-sm">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}