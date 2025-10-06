import { useState } from "react";
import DoubleRangeSlider from "../components/ui/DoubleRangeSlider";

const TestPage = () => {
  const [range, setRange] = useState({ min: 25, max: 75 });

  return (
    <div className="max-w-md mx-auto mt-20">
      <div>
        <h1 className="text-2xl mb-6">Custom Double Range Slider</h1>
        <DoubleRangeSlider
          min={0}
          max={100}
          step={1}
          initialMinValue={25}
          initialMaxValue={75}
          onChange={(min, max) => setRange({ min, max })}
        />
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-800 mb-2">
            Valores en el componente padre:
          </h3>
          <p className="text-gray-600">
            Min: {range.min}, Max: {range.max}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
