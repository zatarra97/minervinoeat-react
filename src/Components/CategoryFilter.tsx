import React, { useState } from 'react';
import { Category } from '../data/restaurants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(selectedCategory === categoryId ? null : categoryId);
    setIsOpen(false); // Chiude il dropdown dopo la selezione su mobile
  };

  return (
    <div className="bg-white special-rounded shadow-sm">
      {/* Header sempre visibile */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-semibold md:mb-4 md:cursor-default cursor-pointer p-4 "
      >
        <span className="ml-3">Categorie</span>
        <div className="md:hidden pr-5">
            <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`md:hidden transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
        </div>
      </button>

      {/* Lista categorie - nascosta su mobile quando chiusa */}
      <div className={`space-y-2 transition-all duration-300 overflow-hidden md:block
        ${isOpen ? 'max-h-[500px] opacity-100 mt-5' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100'}`}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`w-full flex items-center px-3 py-2 special-rounded-small text-left transition-colors cursor-pointer ${
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