import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from './SearchBar';
import { logger } from '../utils/logger';
import { Category } from '../data/restaurants';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (categoryId: string | null) => {
    logger.info('Categoria selezionata:', categoryId);
    onSelectCategory(categoryId);
    setIsOpen(false);
  };

  const handleSearchChange = (query: string) => {
    logger.info('Ricerca modificata:', query);
    onSearchChange(query);
  };

  return (
    <div className="bg-white special-rounded border border-gray-200 p-4">
      {/* Header sempre visibile */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-semibold md:mb-4 md:cursor-default cursor-pointer px-4"
      >
        <div className="flex items-center gap-2">
          <span className="">Filtri</span>
          {(searchQuery || selectedCategory) && (
            <span className="bg-orange-600 text-orange-100 text-sm px-2 py-0.5 rounded-full text-center w-6 h-6">
              {[searchQuery, selectedCategory].filter(Boolean).length}
            </span>
          )}
        </div>
        <div className="md:hidden pr-5">
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`md:hidden transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Contenuto - nascosto su mobile quando chiuso */}
      <div className={`space-y-6 transition-all duration-300 overflow-hidden md:block
        ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100'}`}
      >
        {/* Barra di ricerca */}
        <div className="px-2 mt-2">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>

        {/* Categorie */}
        <div>
          <div className="space-y-2">
            <button
              onClick={() => handleCategorySelect(null)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === null
                  ? 'bg-orange-50 text-orange-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Tutte le categorie
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-orange-50 text-orange-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 