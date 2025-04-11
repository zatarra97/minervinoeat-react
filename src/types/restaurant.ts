export interface Restaurant {
  id: string;
  name: string;
  image: string;
  deliveryTime: string;
  deliveryFee: string;
  minOrder: number;
  category: string;
  menu: MenuCategory[];
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

