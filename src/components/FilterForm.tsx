// src/components/FilterForm.tsx

import React, { useState } from "react";
import MultiSelectDropDown from "./ui/MultiSelectDropDown";
import { getUsageTypeDropdownOptions } from "../services/open-charge-map.service";

type FilterFormProps = {
  onFilterChange: (filters: { usage: string[] }) => void;
};

const FilterForm: React.FC<FilterFormProps> = ({ onFilterChange }) => {
  const [selectedUsage, setSelectedUsage] = useState<string[]>([]);

  const handleUsageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedUsage(selected);
    onFilterChange({ usage: selected });
  };

  const handleFilters = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e)

    // &usagetypeid=1
  }

  return (
    <form className="p-4 rounded shadow space-y-4" onSubmit={handleFilters}>
      <div>
        <label htmlFor="usage" className="block text-sm font-medium text-gray-700">
          Usage Type
        </label>
        <MultiSelectDropDown options={getUsageTypeDropdownOptions()} />
      </div>
      <button className="cursor-pointer flex mx-auto px-4 py-2 rounded-lg text-gray-700 border-1 border-gray-700" type="submit">
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;
