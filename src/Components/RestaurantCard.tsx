import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faEuroSign } from '@fortawesome/free-solid-svg-icons';

interface Restaurant {
  name: string;
  slug: string;
  deliveryCost: string;
  minOrderAmount: string;
  estimatedDeliveryTime: string;
  coverImageUrl: string;
  deliveryEnabled: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  isLoading?: boolean;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white special-rounded shadow-md overflow-hidden border border-gray-200">
        <div className="relative">
          <div className="w-full h-36 md:h-48 bg-gray-200 animate-pulse"></div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium shadow flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/dettaglio/${restaurant.slug}`} className="block group">
      <div className="bg-white special-rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
        <div className="relative">
          <img 
            src={restaurant.coverImageUrl} 
            alt={restaurant.name}
            className="w-full h-36 md:h-48 object-cover hover:scale-105 transition-all duration-300"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium shadow flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} className="text-orange-500" />
            <span>{restaurant.estimatedDeliveryTime}</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
            <div className="flex items-center bg-green-50 px-2 py-1 rounded">
              <FontAwesomeIcon icon={faStar} className="text-green-700" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            {restaurant.deliveryEnabled === 1 && (
              <div className="flex items-center">
                <span className="text-gray-500">Consegna:</span>
                <span className="ml-1 font-medium">
                  {restaurant.deliveryCost === '0' ? 'gratis' : `€${restaurant.deliveryCost}`}
                </span>
              </div>
            )}
            {restaurant.minOrderAmount !== '0' && (
              <div className="flex items-center">
                <span className="text-gray-500">Min:</span>
                <FontAwesomeIcon icon={faEuroSign} className="mx-1 text-gray-500" />
                <span className="font-medium">{restaurant.minOrderAmount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}; 