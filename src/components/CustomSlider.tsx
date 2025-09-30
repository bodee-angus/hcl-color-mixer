import React, { useState, useRef, useCallback, useEffect } from "react";

interface CustomSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  className?: string;
}

export function CustomSlider({ value, min, max, onChange, className = "" }: CustomSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Simple percentage calculation
  const percentage = ((value - min) / (max - min)) * 100;

  const updateValue = useCallback((clientX: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const rawValue = min + (percentage / 100) * (max - min);
    const newValue = Math.round(rawValue);
    
    if (newValue !== value) {
      onChange(newValue);
    }
  }, [min, max, onChange, value]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updateValue(e.clientX);
    }
  }, [isDragging, updateValue]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateValue(e.clientX);
  }, [updateValue]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className={`relative w-full h-4 ${className}`}>
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-full bg-muted rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* Range (filled portion) */}
        <div
          className={`absolute top-0 left-0 h-full bg-primary rounded-l-full ${
            isDragging ? '' : 'transition-all duration-150 ease-out'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}