import { useState } from 'react';
import { Link } from 'react-router-dom';
import { restaurants, categories } from '../../data/restaurants';
import { RestaurantCard } from '../../Components/RestaurantCard';
import { CategoryFilter } from '../../Components/CategoryFilter';
import { SearchBar } from '../../Components/SearchBar';
import { UserMenu } from '../../Components/UserMenu';
import { useAuth } from '../../hooks/useAuth';

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isAuthenticated, isLoading } = useAuth();

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 back-repeat">
      {/* Header con logo, ricerca e accesso */}
      <header className="sticky top-0 z-10 bg-white border-b border-orange-500 shadow-sm">
        <div className="container mx-auto md:px-4 px-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-orange-600 flex-shrink-0">
              {import.meta.env.VITE_APP_NAME}
            </h1>

            {/* Barra di ricerca */}
            <div className="flex-1 max-w-sm mx-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Pulsanti Accesso/Menu Utente */}
            <div className="flex gap-4">
              {/* Link al pannello di controllo dei ristoranti */}
              <Link to="/control-panel" className="btn btn-gray-wire hidden sm:inline-flex">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Pannello Ristorante
              </Link>
              
              {!isLoading && (
                isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link to="/accesso/login" className="btn btn-orange">
                      Accedi
                    </Link>
                    <Link to="/accesso/registrati" className="btn btn-orange-wire">
                      Registrati
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto md:px-4 px-2 py-4 md:py-8">
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

