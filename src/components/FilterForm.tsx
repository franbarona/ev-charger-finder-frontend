import React, { useState } from "react";
import { getUsageTypeDropdownOptions } from "../services/open-charge-map.service";
import type { KwRange, StationsSearchFilters } from "../types/types";
import MultiSelect from "./ui/MultiSelect";
import DoubleRangeSlider from "./ui/DoubleRangeSlider";
import { TbBolt, TbBoltFilled } from "react-icons/tb";

type FilterFormProps = {
  onChangeFilters: (stationsSearchFilters: StationsSearchFilters) => void;
  settedData?: StationsSearchFilters | null;
};

const FilterForm: React.FC<FilterFormProps> = ({
  onChangeFilters,
  settedData,
}) => {
  const [formData, setFormData] = useState({
    usage: settedData?.usage || [],
    kwRange: settedData?.kwRange || { min: 0, max: 350 },
  });

  // const resetForm = () => {
  //   setFormData(prev => ({
  //     ...prev,
  //     usage: [],
  //   }));
  // };

  const handleChangeSelectedUsages = (value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      usage: value,
    }));
  };

  const handleChangeSelectedKwRange = ({ min, max }: KwRange) => {
    setFormData((prev) => ({
      ...prev,
      kwRange: {
        min,
        max,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filters: StationsSearchFilters = {
      usage: formData.usage,
      kwRange: formData.kwRange,
    };
    onChangeFilters(filters);
  };

  return (
    <div>
      <h1 className="text-center text-gray-700 font-semibold text-xl pb-2 border-b-1 border-gray-300">Station Filters</h1>
      <form className="p-4 rounded space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2 mb-4">
          <label
            htmlFor="usage"
            className="block text-sm font-medium text-gray-700"
          >
            Usage Type:
          </label>
          <MultiSelect
            options={getUsageTypeDropdownOptions()}
            onChange={handleChangeSelectedUsages}
            selectedValues={formData.usage}
          />
        </div>
        <div className="space-y-2 mb-4">
          <label
            htmlFor="usage"
            className="block text-sm font-medium text-gray-700"
          >
            Power (kw):
          </label>
          <div className="flex flex-nowrap items-center">
            <TbBolt className="text-emerald-900 text-xl" />
            <DoubleRangeSlider
              min={0}
              max={350}
              step={1}
              initialMinValue={settedData?.kwRange.min || 0}
              initialMaxValue={settedData?.kwRange.max || 350}
              onChange={(min, max) => handleChangeSelectedKwRange({ min, max })}
            />
            <TbBoltFilled className="text-emerald-900 text-4xl" />
          </div>
        </div>
        <div className="px-4 bg-gray-50 justify-self-end">
          <p className="text-sm text-gray-600">
            Selected range:{" "}
            <span className="font-semibold text-emerald-800">
              {formData.kwRange.min} kw - {formData.kwRange.max} kw
            </span>
          </p>
        </div>
        <button
          className="cursor-pointer hover:font-medium flex mx-auto px-4 py-2 rounded-lg bg-zinc-800 text-white"
          type="submit"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
