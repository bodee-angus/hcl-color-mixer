import { useState } from "react";
import { Plus, Info } from "lucide-react";
import { Button } from "./components/ui/button";
import { ColorCard } from "./components/ColorCard";
import { MixedColorDisplay } from "./components/MixedColorDisplay";
import { HclEducationPage } from "./components/HclEducationPage";
import { HCLColor, mixHclColors } from "./utils/colorUtils";
import { Toaster } from "./components/ui/sonner";

const initialColors: HCLColor[] = [
  { h: 240, c: 80, l: 60 }, // Blue
  { h: 0, c: 70, l: 50 },   // Red
];

export default function App() {
  const [colors, setColors] = useState<HCLColor[]>(initialColors);
  const [currentPage, setCurrentPage] = useState<'mixer' | 'education'>('mixer');

  const addColor = () => {
    const newColor: HCLColor = {
      h: Math.floor(Math.random() * 360),
      c: Math.floor(Math.random() * 80) + 20,
      l: Math.floor(Math.random() * 60) + 30,
    };
    setColors([...colors, newColor]);
  };

  const updateColor = (index: number, color: HCLColor) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const mixedColor = mixHclColors(colors);

  if (currentPage === 'education') {
    return <HclEducationPage onBack={() => setCurrentPage('mixer')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-4xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              HCL Color Mixer
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage('education')}
              className="gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              title="Learn about HCL and LAB color mixing"
            >
              <Info className="w-4 h-4" />
              How it works
            </Button>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mix colors using the HCL color space for perceptually uniform color blending. 
            Click any color value to copy it to your clipboard.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Individual Colors */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-gray-700">Source Colors</h2>
              <Button 
                onClick={addColor}
                className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Color
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {colors.map((color, index) => (
                <ColorCard
                  key={index}
                  color={color}
                  onColorChange={(newColor) => updateColor(index, newColor)}
                  onRemove={() => removeColor(index)}
                  canRemove={colors.length > 1}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Mixed Result */}
          <div className="xl:col-span-1">
            <div className="sticky top-6">
              <MixedColorDisplay mixedColor={mixedColor} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500">
          <p className="mb-6">
            HCL (Hue, Chroma, Lightness) provides perceptually uniform color mixing, 
            making it ideal for creating harmonious color palettes.
          </p>
          <div className="border-t border-gray-200 pt-6">
            <p className="mb-3">
              Created and designed with ❤️ by <span className="text-gray-700 font-medium">BoDee Angus</span>
            </p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://bodee-angus.github.io/portfolio-site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors hover:underline"
              >
                Portfolio
              </a>
              <div className="w-px h-4 bg-gray-300" />
              <a
                href="https://github.com/bodee-angus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}