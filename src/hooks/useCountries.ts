
import { useState, useEffect } from 'react';
import { Country, getSortedCountries } from '@/data/countriesData';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const sortedCountries = getSortedCountries();
    setCountries(sortedCountries);
  }, []);

  return { countries };
};
