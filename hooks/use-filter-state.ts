import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  prices: PriceProps;
  selectedIngredients: Set<string>;
  pizzaTypes: Set<string>;
  pizzaSizes: Set<string>;
}

interface FilterState extends Filters {
  setPrices: React.Dispatch<React.SetStateAction<PriceProps>>;
  setSelectedIgredients: (value: string) => void;
  setPizzaTypes: (value: string) => void;
  setPizzaSizes: (value: string) => void;
  onPriceChange: ({ name, value }: { name: string; value: string }) => void;
}

export const useFilterState = (): FilterState => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const [selectedIngredients, { toggle: setSelectedIgredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  );

  const [pizzaTypes, { toggle: setPizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes')
        ? searchParams.get('pizzaTypes')?.split(',')
        : []
    )
  );
  const [pizzaSizes, { toggle: setPizzaSizes }] = useSet(
    new Set<string>(
      searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
    )
  );

  const onPriceChange = ({ name, value }: { name: string; value: string }) => {
    setPrices({
      ...prices,
      [name]: Number(value),
    });
  };

  return {
    prices,
    setPrices,
    selectedIngredients,
    setSelectedIgredients,
    pizzaTypes,
    setPizzaTypes,
    pizzaSizes,
    setPizzaSizes,
    onPriceChange,
  };
};
