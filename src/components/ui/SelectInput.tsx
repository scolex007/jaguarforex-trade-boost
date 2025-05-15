
import React from 'react';
import { Label } from "@/components/ui/label";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  label,
  placeholder = "Select an option",
  required = false,
  error,
  className = "",
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-gray-200">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full h-10 rounded-md border ${error ? 'border-red-500' : 'border-jaguarblue-600'} bg-jaguarblue-800 px-3 py-2 text-base text-white ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectInput;
