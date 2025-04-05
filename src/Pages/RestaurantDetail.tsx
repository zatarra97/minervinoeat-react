import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faEuroSign, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { restaurants } from '../data/restaurants';

export default function RestaurantDetail() {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ristorante non trovato</h2>
        <Link to="/" className="btn btn-orange">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Torna alla home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-orange-500 hover:text-orange-600 flex items-center">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Torna alla lista
          </Link>
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="container mx-auto px-4 py-8">
        {/* Immagine di copertina */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informazioni principali */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="ml-1">({restaurant.reviewCount} recensioni)</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faClock} className="text-orange-500 mr-1" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div>
                  <span className="font-medium">{restaurant.distance}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-gray-600 mb-1">
                Ordine minimo: <FontAwesomeIcon icon={faEuroSign} className="text-gray-500" /> {restaurant.minOrder}
              </div>
              <div className="text-sm text-gray-600">
                Consegna: {restaurant.deliveryFee}
              </div>
            </div>
          </div>

          {/* Categoria e tag */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              {restaurant.category}
            </span>
          </div>

          {/* Informazioni di consegna */}
          <div className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Orari di consegna</h3>
              <p className="text-gray-600">
                Oggi: 11:30 - 23:00
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Zone di consegna</h3>
              <p className="text-gray-600">
                Consegniamo in tutta la città
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
          <div className="grid gap-6">
            {restaurant.menu?.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  </div>
                  <span className="font-semibold">€{item.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 