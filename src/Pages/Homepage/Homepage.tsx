import { useState } from 'react';
import { restaurants, categories } from '../../data/restaurants';
import { RestaurantCard } from '../../Components/RestaurantCard';
import { CategoryFilter } from '../../Components/CategoryFilter';
import { SearchBar } from '../../Components/SearchBar';

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">I nostri ristoranti</h1>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar con filtri */}
          <div className="md:w-64 flex-shrink-0">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Lista ristoranti */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredRestaurants.length} Ristoranti
              </h2>
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">Nessun ristorante trovato</p>
                <p className="text-gray-400 mt-2">Prova a modificare i filtri di ricerca</p>
              </div>
            ) : (
              <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

