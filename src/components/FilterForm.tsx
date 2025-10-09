import React, { useState } from "react";
import {
  getConnectionTypeDropdownOptions,
  getUsageTypeDropdownOptions,
} from "../services/open-charge-map.service";
import type { KwRange, StationsSearchFilters } from "../types/types";
import MultiSelect from "./ui/MultiSelect";
import DoubleRangeSlider from "./ui/DoubleRangeSlider";
import ActionButton from "./ui/ActionButton";
import { SlEnergy } from "react-icons/sl";
import { MAX_KW_RANGE, MIN_KW_RANGE } from "../constants/constants";

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
    kwRange: settedData?.kwRange || { min: MIN_KW_RANGE, max: MAX_KW_RANGE },
    connetions: settedData?.connections || [],
  });

  const resetForm = () => {
    setFormData((prev) => ({
      ...prev,
      usage: [],
      kwRange: {
        min: MIN_KW_RANGE,
        max: MAX_KW_RANGE,
      },
      connetions: [],
    }));
  };

  const handleChangeSelectedUsages = (value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      usage: value,
    }));
  };

  const handleChangeConnectionType = (value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      connetions: value,
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
      connections: formData.connetions,
    };
    onChangeFilters(filters);
  };

  return (
    <div className="p-6">
      <form className="rounded space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2 ">
          <label htmlFor="usage" className="block font-medium">
            Usage Type:
          </label>
          <MultiSelect
            options={getUsageTypeDropdownOptions()}
            onChange={handleChangeSelectedUsages}
            selectedValues={formData.usage}
          />
        </div>
        <div className="space-y-2 ">
          <label htmlFor="usage" className="block font-medium">
            Connection Type:
          </label>
          <MultiSelect
            options={getConnectionTypeDropdownOptions()}
            onChange={handleChangeConnectionType}
            selectedValues={formData.connetions}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="usage" className="block font-medium">
            Power (kw):
          </label>
          <div className="flex flex-nowrap items-center">
            <SlEnergy className="text-gray-900/50 text-lg" />
            <DoubleRangeSlider
              min={MIN_KW_RANGE}
              max={MAX_KW_RANGE}
              step={1}
              initialMinValue={formData.kwRange.min || MIN_KW_RANGE}
              initialMaxValue={formData.kwRange.max || MAX_KW_RANGE}
              onChange={(min, max) => handleChangeSelectedKwRange({ min, max })}
            />
            <SlEnergy className="text-gray-900/70 text-3xl" />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex flex-nowrap gap-1 items-baseline">
              <span>Min:</span>
              <span className="font-semibold text-lg lg:text-xl tracking-tighter text-emerald-600">{formData.kwRange.min}</span>
              <span className="text-xs">kW</span>
            </div>
            <div className="flex flex-nowrap gap-1 items-baseline">
              <span>Max:</span>
              <span className="font-semibold text-lg lg:text-xl tracking-tighter text-emerald-600">{formData.kwRange.max}</span>
              <span className="text-xs">kW</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center mx-auto gap-3">
          <ActionButton action={resetForm} label="Clear" style="secondary" />
          <ActionButton action={handleSubmit} label="Apply" />
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
