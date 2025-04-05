export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: string;
  minOrder: number;
  distance: string;
}

export const categories: Category[] = [
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'burger', name: 'Hamburger', icon: '🍔' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'healthy', name: 'Healthy', icon: '🥗' },
  { id: 'dessert', name: 'Dessert', icon: '🍰' },
  { id: 'drinks', name: 'Bevande', icon: '🍹' },
  { id: 'vegetarian', name: 'Vegetariano', icon: '🥦' }
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizzeria da Mario',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['pizza', 'pasta'],
    rating: 4.8,
    reviewCount: 342,
    deliveryTime: '20-30 min',
    deliveryFee: 'Gratis',
    minOrder: 15,
    distance: '1.2 km'
  },
  {
    id: '2',
    name: 'Burger King',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['burger'],
    rating: 4.2,
    reviewCount: 189,
    deliveryTime: '15-25 min',
    deliveryFee: '€2.50',
    minOrder: 10,
    distance: '0.8 km'
  },
  {
    id: '3',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['sushi'],
    rating: 4.7,
    reviewCount: 278,
    deliveryTime: '30-40 min',
    deliveryFee: '€4.00',
    minOrder: 20,
    distance: '2.5 km'
  },
  {
    id: '4',
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['pasta', 'vegetarian'],
    rating: 4.5,
    reviewCount: 156,
    deliveryTime: '25-35 min',
    deliveryFee: '€3.00',
    minOrder: 18,
    distance: '1.7 km'
  },
  {
    id: '5',
    name: 'Green Salad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['healthy', 'vegetarian'],
    rating: 4.3,
    reviewCount: 98,
    deliveryTime: '15-25 min',
    deliveryFee: '€2.00',
    minOrder: 12,
    distance: '1.1 km'
  },
  {
    id: '6',
    name: 'Dolce Vita',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['dessert', 'drinks'],
    rating: 4.9,
    reviewCount: 215,
    deliveryTime: '20-30 min',
    deliveryFee: '€2.50',
    minOrder: 8,
    distance: '2.0 km'
  }
]; 