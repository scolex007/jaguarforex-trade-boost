
import React from 'react';
import { Label } from "@/components/ui/label";
import { useCountries } from "@/hooks/useCountries";
import { findCountryByCode } from "@/data/countriesData";

export interface CountrySelectProps {
  value: string;
  onChange: (value: string, dialCode: string) => void;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  className = "",
  label = "Country",
  required = false,
  error
}) => {
  const { countries } = useCountries();

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    if (!selectedCountry) {
      onChange("", "");
      return;
    }

    // Find the dial code for the selected country
    const country = findCountryByCode(selectedCountry);
    if (country) {
      onChange(selectedCountry, country.dial_code);
    } else {
      onChange(selectedCountry, "");
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="country" className="text-gray-200">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <select
        id="country"
        name="country"
        value={value}
        onChange={handleCountryChange}
        required={required}
        className={`w-full h-10 rounded-md border ${error ? 'border-red-500' : 'border-jaguarblue-600'} bg-jaguarblue-800 px-3 py-2 text-base text-white ${className}`}
      >
        <option value="">Select a country</option>
        {countries.map(country => (
          <option
            key={country.code}
            value={country.code}
          >
            {country.name} ({country.dial_code})
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CountrySelect;
