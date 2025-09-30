import { ArrowLeft, Palette, Eye, Beaker } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface HclEducationPageProps {
  onBack: () => void;
}

export function HclEducationPage({ onBack }: HclEducationPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-2 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Mixer
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-3xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Understanding HCL & LAB Color Mixing
          </h1>
        </div>

        <div className="space-y-8">
          {/* What is HCL Section */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-200/50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Palette className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-4 text-gray-800">What is HCL Color Space?</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>HCL (Hue, Chroma, Lightness)</strong> is a cylindrical color space based on human visual perception. 
                    Unlike RGB or HSV, HCL is designed to be <em>perceptually uniform</em>, meaning equal changes in HCL values 
                    correspond to equal perceived changes in color.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                      <h3 className="font-medium text-red-800 mb-2">Hue (0-360°)</h3>
                      <p className="text-sm text-red-700">The hue of the color. Red, blue, green, etc. Represented as an angle on the color wheel.</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <h3 className="font-medium text-purple-800 mb-2">Chroma (0-100)</h3>
                      <p className="text-sm text-purple-700">The intensity or saturation of the color. Higher values provide more vivid colors.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-800 mb-2">Lightness (0-100)</h3>
                      <p className="text-sm text-gray-700">How light or dark the color appears. 0 is black, while 100 is white.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Why HCL is Better Section */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-200/50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-4 text-gray-800">Why HCL is Better for Color Mixing</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Traditional RGB color mixing often produces muddy or unexpected results because RGB values don't correspond 
                    to how humans perceive color differences. HCL solves this by organizing colors the way our eyes actually see them into a color space that has irregular dimensions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-800">❌ RGB Mixing Problems:</h3>
                      <ul className="text-sm space-y-2">
                        <li>• Mixing red + green = muddy brown</li>
                        <li>• Brightness changes unpredictably</li>
                        <li>• Equal changes ≠ equal perception</li>
                        <li>• Difficult to create harmonious palettes</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-800">✅ HCL Mixing Benefits:</h3>
                      <ul className="text-sm space-y-2">
                        <li>• Natural, predictable color transitions</li>
                        <li>• Maintains perceptual brightness</li>
                        <li>• Equal steps = equal visual differences</li>
                        <li>• Creates harmonious color combinations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* LAB Space Mixing Section */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-200/50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Beaker className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-4 text-gray-800">How LAB Space Mixing Works</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    This color mixer uses <strong>LAB color space</strong> internally for the most accurate perceptual mixing. 
                    LAB is the foundation that HCL is built upon, using Cartesian coordinates instead of polar coordinates.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6">
                    <h3 className="font-medium text-gray-800 mb-4">The Mixing Process:</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">1</div>
                        <p><strong>Convert HCL to LAB:</strong> Transform polar coordinates (H, C, L) to Cartesian (L, A, B)</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">2</div>
                        <p><strong>Average LAB values:</strong> Mix the L, A, and B components separately</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">3</div>
                        <p><strong>Convert back to HCL:</strong> Transform the mixed LAB result back to HCL coordinates</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Mathematical Note:</strong> LAB mixing preserves perceptual uniformity because it works in a space 
                      where equal distances correspond to equal color differences as perceived by the human eye. This has great applications in data visualization and user accessibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>


        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Ready to try perceptually uniform color mixing?
          </p>
          <Button onClick={onBack} className="gap-2">
            <Palette className="w-4 h-4" />
            Start Mixing Colors
          </Button>
        </div>
      </div>
    </div>
  );
}