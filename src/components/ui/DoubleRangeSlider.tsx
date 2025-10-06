import React, { useState, useRef, useEffect } from "react";

interface DoubleRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  initialMinValue?: number;
  initialMaxValue?: number;
  onChange?: (min: number, max: number) => void;
}

const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  initialMinValue,
  initialMaxValue,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(initialMinValue ?? min);
  const [maxValue, setMaxValue] = useState(initialMaxValue ?? max);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = (value: number) => ((value - min) / (max - min)) * 100;

  const handleMouseMove = (e: MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const value = Math.round((percentage / 100) * (max - min) + min);
    const steppedValue = Math.round(value / step) * step;

    if (isDraggingMin) {
      const newMin = Math.min(steppedValue, maxValue - step);
      setMinValue(newMin);
      onChange?.(newMin, maxValue);
    } else if (isDraggingMax) {
      const newMax = Math.max(steppedValue, minValue + step);
      setMaxValue(newMax);
      onChange?.(minValue, newMax);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDraggingMin, isDraggingMax, minValue, maxValue]);

  return (
    <div className="w-full mx-auto p-6">
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Range Selector</h2>
        <p className="text-gray-600">Selecciona un rango de valores</p>
      </div> */}

      <div
        ref={sliderRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
      >
        {/* Rango activo */}
        <div
          className="absolute h-2 bg-emerald-700/50 rounded-full"
          style={{
            left: `${getPercentage(minValue)}%`,
            width: `${getPercentage(maxValue) - getPercentage(minValue)}%`,
          }}
        />

        {/* Handle mínimo */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group"
          style={{ left: `${getPercentage(minValue)}%` }}
        >
          <div
            className={`w-4 h-4 bg-emerald-700 border-2 border-emerald-800 rounded-full cursor-grab shadow-md transition-transform ${
              isDraggingMin ? "scale-125 cursor-grabbing" : "hover:scale-110"
            }`}
            onMouseDown={() => setIsDraggingMin(true)}
          />
          {/* Tooltip mínimo */}
          <div className={`${isDraggingMin ? 'opacity-100' : 'opacity-0'} in-focus:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm font-medium whitespace-nowrap`}>
            {minValue}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
          </div>
        </div>

        {/* Handle máximo */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${getPercentage(maxValue)}%` }}
        >
          <div
            className={`w-4 h-4 bg-emerald-700 border-2 border-emerald-800 rounded-full cursor-grab shadow-md transition-transform ${
              isDraggingMax ? "scale-125 cursor-grabbing" : "hover:scale-110"
            }`}
            onMouseDown={() => setIsDraggingMax(true)}
          />
          {/* Tooltip máximo */}
          <div className={`${isDraggingMax ? 'opacity-100' : 'opacity-0'} absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm font-medium whitespace-nowrap`}>
            {maxValue}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;

// Ejemplo de uso
// export default function App() {
//   const [range, setRange] = useState({ min: 25, max: 75 });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
//       <DoubleRangeSlider
//         min={0}
//         max={100}
//         step={1}
//         initialMinValue={25}
//         initialMaxValue={75}
//         onChange={(min, max) => setRange({ min, max })}
//       />

//       <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//         <h3 className="font-semibold text-gray-800 mb-2">Valores en el componente padre:</h3>
//         <p className="text-gray-600">Min: {range.min}, Max: {range.max}</p>
//       </div>
//     </div>
//   );
// }
