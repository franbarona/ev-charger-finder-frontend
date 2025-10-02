import React, { useState } from "react";
import MultiSelectDropDown from "./ui/MultiSelectDropDown";
import { getUsageTypeDropdownOptions } from "../services/open-charge-map.service";
import type { StationsSearchFilters } from "../types/types";

type FilterFormProps = {
  onChangeFilters: (stationsSearchFilters: StationsSearchFilters) => void;
  settedData?: StationsSearchFilters | null;
};

const FilterForm: React.FC<FilterFormProps> = ({ onChangeFilters, settedData }) => {

  const [formData, setFormData] = useState({
    usage: settedData?.usage || [],
  });

  // const resetForm = () => {
  //   setFormData(prev => ({
  //     ...prev,
  //     usage: [],
  //   }));
  // };

  const handleChangeSelectedUsages = (value: string[]) => {
    setFormData(prev => ({
      ...prev,
      usage: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filters: StationsSearchFilters = {
      usage: formData.usage,
    };
    // resetForm();
    onChangeFilters(filters);
  };

  return (
    <form className="p-4 rounded shadow space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usage" className="block text-sm font-medium text-gray-700">
          Usage Type
        </label>
        <MultiSelectDropDown name='usage' selectedValues={formData.usage}  options={getUsageTypeDropdownOptions()} onChange={handleChangeSelectedUsages} />
      </div>
      <button className="cursor-pointer flex mx-auto px-4 py-2 rounded-lg text-gray-700 border-1 border-gray-700" type="submit">
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;
