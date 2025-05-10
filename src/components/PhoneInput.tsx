
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  dialCode: string;
  className?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  dialCode,
  className = "",
  label = "Mobile Number",
  placeholder = "Enter your mobile number",
  required = false,
  error
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="mobile" className="text-gray-200">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="flex">
        <div className="flex items-center justify-center h-10 px-3 border border-r-0 rounded-l-md border-jaguarblue-600 bg-jaguarblue-700 text-gray-200">
          {dialCode || "+"}
        </div>
        <Input
          id="mobile"
          name="mobile"
          type="tel"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`rounded-l-none ${error ? 'border-red-500' : 'border-jaguarblue-600'} bg-jaguarblue-800 ${className}`}
          data-lpignore="true"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PhoneInput;
