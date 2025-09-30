import { CustomSlider } from "./CustomSlider";

interface ColorSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit?: string;
  color?: string;
}

export function ColorSlider({ 
  label, 
  value, 
  min, 
  max, 
  onChange, 
  unit = "", 
  color 
}: ColorSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="text-sm tabular-nums">
          {value}{unit}
        </span>
      </div>
      <div className="relative overflow-hidden rounded-lg">
        <CustomSlider
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          className="w-full"
        />
      </div>
    </div>
  );
}