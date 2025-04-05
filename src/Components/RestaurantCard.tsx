import React from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../types/restaurant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faLocationDot, faEuroSign } from '@fortawesome/free-solid-svg-icons';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/dettaglio/${restaurant.id}`} className="block group">
      <div className="bg-white special-rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-36 md:h-48 object-cover hover:scale-105 transition-all duration-300"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium shadow flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} className="text-orange-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
            <div className="flex items-center bg-green-50 px-2 py-1 rounded">
              <span className="text-green-700 font-semibold mr-1">{restaurant.rating}</span>
              <FontAwesomeIcon icon={faStar} className="text-green-700" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="text-gray-500">Consegna:</span>
              <span className="ml-1 font-medium">{restaurant.deliveryFee}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500">Min:</span>
              <FontAwesomeIcon icon={faEuroSign} className="mx-1 text-gray-500" />
              <span className="font-medium">{restaurant.minOrder}</span>
            </div>
          </div>

          <div className="mt-3">
            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 special-rounded-small min-w-20 text-center">
              {restaurant.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}; 