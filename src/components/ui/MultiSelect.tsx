import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { MAX_SELECTED_TO_SHOW } from "../../constants/constants";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  placeholder?: string;
  selectedValues?: string[];
  onChange?: (selected: string[]) => void;
  maxHeight?: string;
  maxSelectedToShow?: number;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = "Select options...",
  selectedValues = [],
  onChange,
  maxHeight = "15rem",
  maxSelectedToShow = MAX_SELECTED_TO_SHOW,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(selectedValues);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (JSON.stringify(selectedValues) !== JSON.stringify(selected)) {
      setSelected(selectedValues);
    }
  }, [selectedValues]);

  // Manage overclick
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Manage escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const toggleOption = useCallback(
    (value: string) => {
      const newSelected = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];

      setSelected(newSelected);
      onChange?.(newSelected);
    },
    [selected, onChange]
  );

  const getSelectedLabels = useMemo(() => {
    if (selected.length === 0) return null;

    const selectedOptions = selected
      .map((val) => options.find((opt) => opt.value === val))
      .filter(Boolean) as Option[];

    if (selectedOptions.length <= maxSelectedToShow) {
      return selectedOptions.map((opt) => opt.label).join(", ");
    }

    const selectedToShow = selectedOptions
      .slice(0, maxSelectedToShow)
      .map((opt) => opt.label)
      .join(", ");
    const remaining = selectedOptions.length - maxSelectedToShow;
    return `${selectedToShow} &+ other ${remaining}`;
  }, [selected, options]);

  // Create set for search O(1)
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const clearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelected([]);
      onChange?.([]);
    },
    [onChange]
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        role="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-left ${
            selected.length === 0 ? "text-gray-500" : "text-gray-900"
          }`}
        >
          {getSelectedLabels?.split('&')[0] || placeholder}
          {
            getSelectedLabels?.split('&')[1] &&
            <strong className="text-gray-700">{getSelectedLabels?.split('&')[1]}</strong>
          }
        </span>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear selection"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <LuChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          role="listbox"
          aria-multiselectable="true"
        >
          {options.length === 0 ? (
            <div className="px-4 py-3 text-gray-500 text-center">
              No options available
            </div>
          ) : (
            <div className="overflow-y-auto" style={{ maxHeight }}>
              {options.map((option) => {
                const isSelected = selectedSet.has(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleOption(option.value)}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-emerald-600/10 transition-colors text-left cursor-pointer ${
                      isSelected ? "bg-emerald-50" : ""
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="text-gray-900">{option.label}</span>
                    {isSelected && (
                      <LuCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
