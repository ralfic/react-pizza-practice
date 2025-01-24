import { useRouter } from 'next/navigation';
import React from 'react';
import { Filters } from './use-filter-state';
import qs from 'qs';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  React.useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.pizzaSizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, { scroll: false });
  }, [router, filters.prices, filters.pizzaTypes, filters.pizzaSizes, filters.selectedIngredients]);
};
