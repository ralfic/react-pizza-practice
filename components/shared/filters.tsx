'use client';

import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { useIgredients, useFilterState, useQueryFilters } from '@/hooks';
import { CheckboxFiltersGroup } from './checkbox-filters-group';

interface Props {
  className?: string;
}
export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, isLoading } = useIgredients();
  const filters = useFilterState();
  const {
    setPizzaSizes,
    setPizzaTypes,
    setSelectedIgredients,
    onPriceChange,
    setPrices,
    pizzaSizes,
    selectedIngredients,
    pizzaTypes,
    prices,
  } = filters;

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  useQueryFilters(filters);

  return (
    <div className={className}>
      <Title size="sm" className="mb-5 font-bold" text="Фильтры" />

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={setPizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={setPizzaSizes}
        selected={pizzaSizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={prices.priceFrom}
            onChange={(e) =>
              onPriceChange({ name: 'priceFrom', value: e.target.value })
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            onChange={(e) =>
              onPriceChange({ name: 'priceTo', value: e.target.value })
            }
            value={prices.priceTo}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom || 0, prices.priceTo || 1000]}
          onValueChange={([from, to]) =>
            setPrices({ priceFrom: from, priceTo: to })
          }
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты:"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        isLoading={isLoading}
        onClickCheckbox={setSelectedIgredients}
        selected={selectedIngredients}
        name={'ingredients'}
      />
    </div>
  );
};
