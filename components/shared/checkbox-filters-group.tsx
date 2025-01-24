'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  className?: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  isLoading?: boolean;
  selected?: Set<string>;
  name?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  className,
  onClickCheckbox,
  isLoading,
  selected,
  name
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (isLoading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <p className="font-bold mb-3">{title}</p>
      <div className="mb-5">
        {showAll && (
          <Input
            className="bg-gray-50 border-none mb-5"
            placeholder={searchInputPlaceholder}
            onChange={onSearch}
          />
        )}
        <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
          {list.map((item, index) => (
            <FilterCheckbox
              key={index}
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={selected?.has(item.value)}
              onCheckedChange={() => {
                if (onClickCheckbox) {
                  onClickCheckbox(item.value);
                }
              }}
              name={name}
            />
          ))}
        </div>

        {items.length > limit && (
          <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-primary mt-3"
            >
              {showAll ? 'Скрыть' : '+ Показать все'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
