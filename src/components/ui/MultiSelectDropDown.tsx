import React, { useState } from 'react';
import Select, { type MultiValue } from 'react-select';
import { type Option } from '../../types/types';

// Definimos las props que acepta el componente
interface MultiSelectDropDownProps {
  options: Option[];
}

const MultiSelectDropDown: React.FC<MultiSelectDropDownProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);

  // Función para manejar el cambio de selección
  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected);
  };

  return (
    <div>
      <Select
        isMulti // Habilita la selección múltiple
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        getOptionLabel={(e) => e.label} // Muestra el label de cada opción
        getOptionValue={(e) => e.value} // Muestra el value de cada opción
        closeMenuOnSelect={false} // Evita que el menú se cierre al seleccionar
      />
    </div>
  );
};

export default MultiSelectDropDown;
