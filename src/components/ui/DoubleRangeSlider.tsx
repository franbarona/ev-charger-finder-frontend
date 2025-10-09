import React, { useState, useRef, useEffect, useCallback } from "react";

interface DoubleRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  initialMinValue?: number;
  initialMaxValue?: number;
  showTooltip?: boolean;
  onChange?: (min: number, max: number) => void;
}

const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  initialMinValue,
  initialMaxValue,
  showTooltip = false,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(initialMinValue ?? min);
  const [maxValue, setMaxValue] = useState(initialMaxValue ?? max);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMinValue !== undefined && initialMinValue !== minValue) {
      setMinValue(initialMinValue);
    }
  }, [initialMinValue]);

  useEffect(() => {
    if (initialMaxValue !== undefined && initialMaxValue !== maxValue) {
      setMaxValue(initialMaxValue);
    }
  }, [initialMaxValue]);

  const getPercentage = useCallback(
    (value: number) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  const updateValue = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((clientX - rect.left) / rect.width) * 100)
      );
      const value = Math.round((percentage / 100) * (max - min) + min);
      const steppedValue = Math.round(value / step) * step;

      if (isDraggingMin) {
        const newMin = Math.min(steppedValue, maxValue - step);
        if (newMin !== minValue) {
          setMinValue(newMin);
          onChange?.(newMin, maxValue);
        }
      } else if (isDraggingMax) {
        const newMax = Math.max(steppedValue, minValue + step);
        if (newMax !== maxValue) {
          setMaxValue(newMax);
          onChange?.(minValue, newMax);
        }
      }
    },
    [isDraggingMin, isDraggingMax, minValue, maxValue, min, max, step, onChange]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      updateValue(e.clientX);
    },
    [updateValue]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateValue(e.touches[0].clientX);
      }
    },
    [updateValue]
  );

  const handleEnd = useCallback(() => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  }, []);

  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleEnd);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isDraggingMin, isDraggingMax, handleMouseMove, handleTouchMove, handleEnd]);

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);

  return (
    <div className="w-full mx-auto py-6 px-4">
      <div
        ref={sliderRef}
        className="relative h-2 bg-gray-400/50 rounded-full cursor-pointer"
      >
        {/* Active range */}
        <div
          className="absolute h-2 bg-emerald-600/50 rounded-full"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />

        {/* Min. handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group"
          style={{ left: `${minPercentage}%` }}
        >
          <div
            className={`w-4 h-4 bg-emerald-600 border-2 border-emerald-600 rounded-full cursor-grab shadow-md transition-transform ${
              isDraggingMin ? "scale-125 cursor-grabbing" : "hover:scale-110"
            }`}
            onMouseDown={() => setIsDraggingMin(true)}
            onTouchStart={() => setIsDraggingMin(true)}
            role="slider"
            aria-valuenow={minValue}
            aria-valuemin={min}
            aria-valuemax={max}
            tabIndex={0}
          />
          {/* Min. tooltip */}
          {showTooltip && (
            <div
              className={`${
                isDraggingMin
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              } transition-opacity absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm font-medium whitespace-nowrap pointer-events-none`}
            >
              {minValue}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
            </div>
          )}
        </div>

        {/* Max. handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group"
          style={{ left: `${maxPercentage}%` }}
        >
          <div
            className={`w-4 h-4 bg-emerald-600 border-2 border-emerald-600 rounded-full cursor-grab shadow-md transition-transform ${
              isDraggingMax ? "scale-125 cursor-grabbing" : "hover:scale-110"
            }`}
            onMouseDown={() => setIsDraggingMax(true)}
            onTouchStart={() => setIsDraggingMax(true)}
            role="slider"
            aria-valuenow={maxValue}
            aria-valuemin={min}
            aria-valuemax={max}
            tabIndex={0}
          />
          {/* Max. tooltip */}
          {showTooltip && (
            <div
              className={`${
                isDraggingMax
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              } transition-opacity absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm font-medium whitespace-nowrap pointer-events-none`}
            >
              {maxValue}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
            </div>
          )}
        </div>
      </div>

      {/* Demo display */}
      {/* <div className="mt-8 text-center">
        <p className="text-gray-600 mb-2">Rango seleccionado:</p>
        <p className="text-2xl font-bold text-emerald-600">
          {minValue} - {maxValue}
        </p>
      </div> */}
    </div>
  );
};

export default DoubleRangeSlider;
