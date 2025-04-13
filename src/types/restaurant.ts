export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  coverImageUrl: string;
  estimatedDeliveryTime: string;
  deliveryCost: string;
  minOrderAmount: string;
  deliveryEnabled: number;
  pickupEnabled: number;
  category?: string;
  menu?: any; // TODO: Definire il tipo corretto per il menu
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imgUrl: string | null;
}

