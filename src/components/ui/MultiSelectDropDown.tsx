// components/MultiSelectDropDown.tsx

import React from 'react';
import Select from 'react-select';
import { type Option } from '../../types/types';

interface MultiSelectDropDownProps {
  name: string;
  selectedValues: string[];  // <— sigue usando string[] externamente
  options: Option[];
  onChange: (selected: string[]) => void;
}

const MultiSelectDropDown: React.FC<MultiSelectDropDownProps> = ({
  name,
  selectedValues,
  options,
  onChange
}) => {
  // Convertimos los string[] a Option[] para react-select
  const selectedOptions = options.filter(option =>
    selectedValues.includes(option.value)
  );

  // react-select devuelve Option[], lo convertimos de nuevo a string[]
  const handleChange = (selected: readonly Option[] | null) => {
    const values = [...selected?.map(option => option.value) || []];
    onChange(values);
  };

  return (
    <div>
      <Select
        isMulti
        name={name}
        options={options}
        value={selectedOptions} // <-- Option[]
        onChange={handleChange}
        closeMenuOnSelect={false}
        placeholder="Selecciona opciones..."
      />
    </div>
  );
};

export default MultiSelectDropDown;
