import { useState } from 'react';
import { restaurants, categories } from '../../data/restaurants';
import { RestaurantCard } from '../../Components/RestaurantCard';
import { CategoryFilter } from '../../Components/CategoryFilter';
import { SearchBar } from '../../Components/SearchBar';
import { UserMenu } from '../../Components/UserMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 back-repeat">
      <header className="sticky top-0 z-10 bg-white border-b border-orange-500 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 w-full">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-orange-600 flex-shrink-0">
              {import.meta.env.VITE_APP_NAME}
            </h1>

            {/* Barra di ricerca - Desktop */}
            <div className="hidden md:block flex-1 max-w-sm mx-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Area destra con controlli */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Icona ricerca (sempre visibile) */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FontAwesomeIcon icon={showMobileSearch ? faTimes : faSearch} />
              </button>

              {/* Menu utente unificato */}
              <UserMenu />
            </div>
          </div>

          {/* Barra di ricerca mobile */}
          {showMobileSearch && (
            <div className="md:hidden py-3 border-t border-gray-200">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar con filtri - sticky */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-[84px]"> {/* Altezza header (64px) + spazio (20px) */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-6 gap-3">
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

