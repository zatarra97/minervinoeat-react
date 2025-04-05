import React from 'react';
import { Category } from '../data/restaurants';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Categorie</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(selectedCategory === category.id ? null : category.id)}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
              selectedCategory === category.id
                ? 'bg-orange-100 text-orange-800'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <span className="text-xl mr-3">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 