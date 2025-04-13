import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEuroSign, faShoppingCart, faPlus, faMinus, faTrash, faTimes, faBicycle, faStore } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { MenuItem, MenuCategory } from '../types/restaurant';
import { Navbar } from '../Components/Navbar/Navbar';
import { getPublicMerchantInfo, getMerchantMenu } from '../services/api-utility';
import { logger } from '../utils/logger';

interface Restaurant {
  id: string;
  slug: string;
  name: string;
  coverImageUrl: string;
  estimatedDeliveryTime: string;
  deliveryCost: number;
  minOrderAmount: string;
  deliveryEnabled: number;
  pickupEnabled: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

type DeliveryType = 'delivery' | 'pickup';

export default function RestaurantDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const restaurantDataRef = useRef<Restaurant | null>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      logger.info('fetchRestaurantData', slug);
      if (!slug || isFetching.current) return;
      
      if (restaurantDataRef.current?.slug === slug) {
        setRestaurant(restaurantDataRef.current);
        setIsLoading(false);
        return;
      }

      try {
        isFetching.current = true;
        const [restaurantData, menuData] = await Promise.all([
          getPublicMerchantInfo(slug),
          getMerchantMenu(slug)
        ]);
        
        restaurantDataRef.current = restaurantData;
        setRestaurant(restaurantData);
        setMenu(menuData);
        
        if (restaurantData.deliveryEnabled === 1) {
          setDeliveryType('delivery');
        } else if (restaurantData.pickupEnabled === 1) {
          setDeliveryType('pickup');
        }
      } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
      } finally {
        setIsLoading(false);
        isFetching.current = false;
      }
    };

    fetchRestaurantData();
  }, [slug]);

  const addToCart = (item: MenuItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return currentCart.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);

  const handleProceedToCheckout = () => {
    if (!restaurant) return;
    
    navigate('/conferma-ordine', {
      state: {
        restaurant,
        cartItems: cart,
        deliveryType
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen md:bg-gray-50">
        <Navbar isSticky={false} />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 special-rounded mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen md:bg-gray-50">
        <Navbar isSticky={false} />
        <div className="flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ristorante non trovato</h2>
        </div>
      </div>
    );
  }

  const Cart = () => (
    <div className={`${
      isCartOpen 
        ? 'fixed inset-0 z-50 overflow-y-auto bg-white' 
        : 'hidden lg:block lg:sticky lg:top-4'
    }`}>
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm h-full overflow-y-auto py-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-center w-full md:mt-3 md:text-2xl">Il tuo ordine</h2>
          {isCartOpen && (
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 text-xl cursor-pointer">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          {restaurant.deliveryEnabled === 1 && (
            <button
              onClick={() => setDeliveryType('delivery')}
              className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer ${
                deliveryType === 'delivery'
                  ? 'btn btn-orange'
                  : 'btn btn-gray'
              }`}
            >
              <FontAwesomeIcon icon={faBicycle} />
              <span>Consegna</span>
            </button>
          )}
          {restaurant.pickupEnabled === 1 && (
            <button
              onClick={() => setDeliveryType('pickup')}
              className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer ${
                deliveryType === 'pickup'
                  ? 'btn btn-orange'
                  : 'btn btn-gray'
              }`}
            >
              <FontAwesomeIcon icon={faStore} />
              <span>Ritiro</span>
            </button>
          )}
        </div>
        
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Il carrello è vuoto</p>
        ) : (
          <>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <div className="pr-2">
                    <h3 className="font-medium text-base">{item.name}</h3>
                    <p className="text-base text-gray-500">€{parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center md:gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn-small btn-orange-wire"
                    >
                      {item.quantity > 1 ? 
                          <FontAwesomeIcon icon={faMinus} />
                      :
                          <FontAwesomeIcon icon={faTrash} />
                      }
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="btn-small btn-orange-wire"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 -mt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotale</span>
                  <span className="font-medium">€{cartTotal.toFixed(2)}</span>
                </div>
                {restaurant.deliveryEnabled === 1 && deliveryType === 'delivery' && restaurant.deliveryCost && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consegna</span>
                    <span className="font-medium">
                      {restaurant.deliveryCost > 0 ? `€${restaurant.deliveryCost}` : 'gratis'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Totale</span>
                  <span>€{(cartTotal + (deliveryType === 'delivery' && restaurant.deliveryCost ? parseFloat(restaurant.deliveryCost.toString()) : 0)).toFixed(2)}</span>
                </div>
              </div>
              <button 
                className={`w-full btn btn-orange text-xl mb-15 lg:mb-0 ${
                  deliveryType === 'delivery' && restaurant.minOrderAmount && cartTotal < parseFloat(restaurant.minOrderAmount)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={deliveryType === 'delivery' && restaurant.minOrderAmount ? cartTotal < parseFloat(restaurant.minOrderAmount) : false}
                onClick={handleProceedToCheckout}
              >
                {deliveryType === 'delivery' && restaurant.minOrderAmount && cartTotal < parseFloat(restaurant.minOrderAmount)
                  ? `Ordine minimo €${parseFloat(restaurant.minOrderAmount).toFixed(2)}`
                  : 'Procedi all\'ordine'
                }
              </button>
            </div>
          </>
        )}
        
        {isCartOpen && (
          <button
            onClick={() => setIsCartOpen(false)}
            className="fixed bottom-0 left-0 right-0 bg-orange-300 text-white py-4 text-center cursor-pointer font-semibold text-lg"
          >
            Aggiungi altri articoli
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen md:bg-gray-50 back-repeat">
      <Navbar isSticky={false} />

      {/* Contenuto principale */}
      <div className="container mx-auto lg:px-4 lg:py-4">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Immagine di copertina */}
            <div className="relative h-[250px] lg:h-[300px] special-rounded overflow-hidden mb-4 shadow-lg">
              <img
                src={restaurant.coverImageUrl}
                alt={restaurant.name}
                className="w-full h-full object-cover shadow-lg"
              />
            </div>

            {/* Informazioni principali */}
            <div className="mb-8 px-2 lg:px-0">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6 md:shadow-sm p-4 md:p-6 md:border md:border-gray-200 md:rounded-xl bg-white">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
                  <div className="flex items-center gap-4 text-base text-gray-600">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="text-orange-500 mr-1" />
                      <span>{restaurant.estimatedDeliveryTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {restaurant.minOrderAmount && (
                    <div className="text-base text-gray-600 mb-1">
                      Ordine minimo: €{restaurant.minOrderAmount === '0' ? 'gratis' : restaurant.minOrderAmount}
                    </div>
                  )}
                  {restaurant.deliveryEnabled === 1 && restaurant.deliveryCost && (
                    <div className="text-base text-gray-600">
                      Consegna: {restaurant.deliveryCost > 0 ? `€${restaurant.deliveryCost}` : 'gratis'}
                    </div>
                  )}
                </div>
              </div>

              {/* Menu */}
              <div className="mb-4 lg:mb-8">
                {menu.map(category => (
                  <div key={category.name} className="mb-4 md:shadow-sm p-4 md:p-6 md:border md:border-gray-200 rounded-xl bg-white">
                    <h2 className="text-2xl font-bold text-orange-500 mb-4">{category.name}</h2>
                    <div className="space-y-4">
                      {category.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <div className="pr-2">
                            <h3 className="font-medium text-lg">{item.name}</h3>
                            <h3 className="text-base text-gray-500">{item.description}</h3>
                            <p className="text-base text-gray-500">€{parseFloat(item.price).toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => addToCart(item)}
                            className="btn-small btn-orange-wire"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carrello Desktop */}
          <div className="hidden lg:block">
            <Cart />
          </div>
        </div>
      </div>

      {/* Pulsante carrello mobile */}
      {cart.length > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-4 left-4 mx-auto lg:hidden bg-orange-500 text-white px-6 py-4 special-rounded shadow-xl cursor-pointer flex items-center justify-center "
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          <span className="font-semibold text-lg">Carrello</span>
          <span className="bg-white text-orange-500 px-2 py-1 rounded-full text-lg ml-2 w-8 h-8 flex items-center justify-center font-semibold">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </button>
      )}

      {/* Carrello Mobile */}
      {isCartOpen && (
        <div className="lg:hidden">
          <Cart />
        </div>
      )}
    </div>
  );
} 