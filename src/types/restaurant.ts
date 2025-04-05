export interface Restaurant {
  id: string;
  name: string;
  image: string;
  deliveryTime: string;
  rating: number;
  distance: string;
  reviewCount: number;
  deliveryFee: string;
  minOrder: number;
  category: string;
  menu: MenuItem[];
} 

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

