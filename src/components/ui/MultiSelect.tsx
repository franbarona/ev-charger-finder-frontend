import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown, LuCheck  } from "react-icons/lu";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  placeholder?: string;
  selectedValues?: string[];
  onChange?: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = 'Select options...',
  selectedValues = [],
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(selectedValues);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];
    
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const getSelectedLabels = () => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) {
      return options.find(opt => opt.value === selected[0])?.label || '';
    }
    return `${selected.length} selected`;
  };

  const isSelected = (value: string) => selected.includes(value);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className=" cursor-pointer w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <span className={selected.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
          {getSelectedLabels()}
        </span>
        <LuChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-gray-900">{option.label}</span>
              {isSelected(option.value) && (
                <LuCheck className="w-5 h-5 text-emerald-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
