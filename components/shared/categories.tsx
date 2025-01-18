'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
interface Props {
  className?: string;
}

const categories = [
  { id: 1, name: 'Все' },
  { id: 2, name: 'Мясные' },
  { id: 3, name: 'Вегетарианская' },
  { id: 4, name: 'Гриль' },
  { id: 5, name: 'Острые' },
  { id: 6, name: 'С курицей' },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const activeId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}
    >
      {categories.map(({ name, id }) => (
        <a
          className={cn(
            'flex items-center font-bold  h-11 rounded-xl px-5',
            activeId === id  &&
              'bg-white shadow-sm shadow-gray-200 text-primary'
          )}
          href={`/#${name}`}
          key={id}
        >
          <button className="first-letter:uppercase">{name}</button>
        </a>
      ))}
    </div>
  );
};
