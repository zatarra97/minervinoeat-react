import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faEuroSign, faShoppingCart, faPlus, faMinus, faTrash, faTimes, faBicycle, faStore } from '@fortawesome/free-solid-svg-icons';
import { restaurants } from '../data/restaurants';
import { useState } from 'react';
import { MenuItem } from '../types/restaurant';
import { Navbar } from '../Components/Navbar/Navbar';

interface CartItem extends MenuItem {
  quantity: number;
}

type DeliveryType = 'delivery' | 'pickup';

export default function RestaurantDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');

  const addToCart = (item: MenuItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName: string) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.name === itemName);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(cartItem =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return currentCart.filter(cartItem => cartItem.name !== itemName);
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleProceedToCheckout = () => {
    navigate('/conferma-ordine', {
      state: {
        restaurant,
        cartItems: cart,
        deliveryType
      }
    });
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen md:bg-gray-50">
        <Navbar isSticky={false} searchQuery={''} onSearchChange={() => {}} />
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
      <div className="bg-white p-4 rounded-lg shadow-sm h-full overflow-y-auto py-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-center w-full md:mt-3 md:text-2xl">Il tuo ordine</h2>
          {isCartOpen && (
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 text-xl cursor-pointer">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6">
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
            <span className="text-base">
              {deliveryType === 'delivery'}
            </span>
          </button>
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
            <span className="text-base">
              {deliveryType === 'pickup' }
            </span>
          </button>
        </div>
        
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Il carrello è vuoto</p>
        ) : (
          <>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.name} className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <div>
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-base text-gray-500">€{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.name)}
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
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consegna</span>
                    <span className="font-medium">{restaurant.deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Totale</span>
                  <span>€{(cartTotal + (deliveryType === 'delivery' ? parseFloat(restaurant.deliveryFee.replace('€', '')) : 0)).toFixed(2)}</span>
                </div>
              </div>
              <button 
                className={`w-full btn btn-orange text-xl mb-15 lg:mb-0 ${
                  cartTotal < restaurant.minOrder && deliveryType === 'delivery'
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={cartTotal < restaurant.minOrder && deliveryType === 'delivery'}
                onClick={handleProceedToCheckout}
              >
                {cartTotal < restaurant.minOrder && deliveryType === 'delivery' 
                  ? `Ordine minimo €${restaurant.minOrder.toFixed(2)}`
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
      <Navbar isSticky={false} searchQuery={''} onSearchChange={() => {}} />

      {/* Contenuto principale */}
      <div className="container mx-auto lg:px-4 lg:py-4">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Immagine di copertina */}
            <div className="relative h-[250px] lg:h-[300px] special-rounded overflow-hidden mb-4  shadow-lg">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover shadow-lg"
              />
            </div>

            {/* Informazioni principali */}
            <div className="bg-white rounded-lg md:shadow-sm p-4 lg:p-6 mb-8 md:border border-gray-200">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
                  <div className="flex items-center gap-4 text-base text-gray-600">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="text-orange-500 mr-1" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-base text-gray-600 mb-1">
                    Ordine minimo: <FontAwesomeIcon icon={faEuroSign} className="text-gray-500" /> {restaurant.minOrder}
                  </div>
                  <div className="text-base text-gray-600">
                    Consegna: {restaurant.deliveryFee}
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="space-y-8">
                {restaurant.menu.map((category, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.category}</h2>
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg  border border-gray-200">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                            <p className="text-gray-600 text-base mt-1">{item.description}</p>
                            <p className="text-orange-500 font-medium">€{item.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => addToCart(item)}
                            className="btn-small btn-orange text-center"
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