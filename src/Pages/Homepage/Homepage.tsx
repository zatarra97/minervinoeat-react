import { useState, useEffect, useRef } from 'react';
import { getPublicMerchantsList } from '../../services/api-utility';
import { RestaurantCard } from '../../Components/RestaurantCard';
import { CategoryFilter } from '../../Components/CategoryFilter';
import { Navbar } from '../../Components/Navbar/Navbar';

interface Restaurant {
  name: string;
  slug: string;
  deliveryCost: string;
  minOrderAmount: string;
  estimatedDeliveryTime: string;
  coverImageUrl: string;
  deliveryEnabled: number;
}

// Cache globale per i dati dei ristoranti
let restaurantsCache: Restaurant[] | null = null;

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      // Se stiamo già facendo una richiesta, non ne facciamo un'altra
      if (isFetching.current) return;
      
      // Se abbiamo i dati in cache, li usiamo
      if (restaurantsCache) {
        setRestaurants(restaurantsCache);
        setIsLoading(false);
        return;
      }

      try {
        isFetching.current = true;
        const today = new Date().toISOString().split('T')[0]; // Formato aaaa-mm-gg
        const data = await getPublicMerchantsList(today);
        restaurantsCache = data; // Salva i dati in cache
        setRestaurants(data);
      } catch (error) {
        console.error('Errore nel caricamento dei ristoranti:', error);
      } finally {
        setIsLoading(false);
        isFetching.current = false;
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 back-repeat">
      <Navbar isSticky={true} />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar con filtri - sticky */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-[84px]">
              <CategoryFilter
                categories={[]} // Per ora non abbiamo categorie dall'API
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </div>

          {/* Lista ristoranti */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {isLoading ? (
                  <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  `${filteredRestaurants.length} Ristoranti`
                )}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-6 gap-3">
                {[...Array(6)].map((_, index) => (
                  <RestaurantCard 
                    key={index} 
                    restaurant={{
                      name: '',
                      slug: '',
                      deliveryCost: '0',
                      minOrderAmount: '0',
                      estimatedDeliveryTime: '',
                      coverImageUrl: '',
                      deliveryEnabled: 1
                    }}
                    isLoading={true}
                  />
                ))}
              </div>
            ) : filteredRestaurants.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">Nessun ristorante trovato</p>
                <p className="text-gray-400 mt-2">Prova a modificare i filtri di ricerca</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-6 gap-3">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard 
                    key={restaurant.slug} 
                    restaurant={restaurant} 
                    isLoading={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

