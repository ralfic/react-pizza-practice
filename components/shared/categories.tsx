'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
interface Props {
  categories: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className, categories }) => {
  const activeId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}
    >
      {categories.map(({ name, id }) => (
        <a
          className={cn(
            'flex items-center font-bold  h-11 rounded-xl px-5',
            activeId === id && 'bg-white shadow-sm shadow-gray-200 text-primary'
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
