import { Copy } from "lucide-react";
import { Card } from "./ui/card";
import { HCLColor, hclToHex, hclToRgb } from "../utils/colorUtils";
import { toast } from "sonner@2.0.3";

interface MixedColorDisplayProps {
  mixedColor: HCLColor;
}

export function MixedColorDisplay({ mixedColor }: MixedColorDisplayProps) {
  const hex = hclToHex(mixedColor.h, mixedColor.c, mixedColor.l);
  const rgb = hclToRgb(mixedColor.h, mixedColor.c, mixedColor.l);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${text} to clipboard`);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-xl">
      <div className="text-center space-y-6">
        <h2 className="text-lg text-gray-600">Mixed Color</h2>
        
        {/* Large Color Preview */}
        <div 
          className="w-full h-32 rounded-2xl shadow-lg border border-gray-200/30"
          style={{ backgroundColor: hex }}
        />

        {/* Hex Value - Large and Clickable */}
        <div 
          className="cursor-pointer px-6 py-4 rounded-xl hover:bg-white/60 transition-all duration-200 group"
          onClick={() => copyToClipboard(hex)}
          title="Click to copy hex value"
        >
          <div className="font-mono text-2xl tracking-wide select-all group-hover:scale-105 transition-transform duration-200">
            {hex}
          </div>
          <Copy className="inline-block w-4 h-4 ml-3 opacity-40 group-hover:opacity-70 transition-opacity duration-200" />
        </div>

        {/* HCL Values */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/50">
          {[
            { label: 'Hue', value: mixedColor.h, unit: '°' },
            { label: 'Chroma', value: mixedColor.c, unit: '%' },
            { label: 'Lightness', value: mixedColor.l, unit: '%' }
          ].map(({ label, value, unit }) => (
            <div 
              key={label}
              className="text-center cursor-pointer px-3 py-2 rounded-lg hover:bg-white/60 transition-colors duration-150"
              onClick={() => copyToClipboard(`${value}${unit}`)}
              title={`Click to copy ${label} value`}
            >
              <div className="text-sm text-muted-foreground mb-1">{label}</div>
              <div className="font-mono">{value}{unit}</div>
            </div>
          ))}
        </div>

        {/* RGB Values */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { label: 'R', value: rgb.r },
            { label: 'G', value: rgb.g },
            { label: 'B', value: rgb.b }
          ].map(({ label, value }) => (
            <div 
              key={label}
              className="text-center cursor-pointer px-3 py-2 rounded-lg hover:bg-white/60 transition-colors duration-150"
              onClick={() => copyToClipboard(value.toString())}
              title={`Click to copy ${label} value`}
            >
              <div className="text-sm text-muted-foreground mb-1">{label}</div>
              <div className="font-mono">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}