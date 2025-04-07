export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'completed' | 'in_progress' | 'cancelled';
  deliveryAddress: string;
  orderNumber: string;
}

export const orders: Order[] = [
  {
    id: '1',
    restaurantId: '1',
    restaurantName: 'Lievità Pizzeria Rosticceria',
    restaurantImage: '/images/restaurants/lievita.png',
    date: '28 marzo 2025 alle 19:48',
    items: [
      {
        id: '1',
        name: 'Lievità',
        quantity: 1,
        price: 7.00,
        notes: 'Impasto Normale, *No Scelta'
      },
      {
        id: '2',
        name: 'Ciccio alla Nutella',
        quantity: 1,
        price: 3.00
      },
      {
        id: '3',
        name: 'Bibita [Coca Cola Zero]',
        quantity: 1,
        price: 1.50
      }
    ],
    total: 12.80,
    status: 'completed',
    deliveryAddress: 'Via Melo da Bari, 167, Studio D\'abbicco, 6 Piano',
    orderNumber: '#187277888'
  },
  {
    id: '2',
    restaurantId: '2',
    restaurantName: 'La Porchetteria di Ariccia',
    restaurantImage: '/images/restaurants/porchetteria.png',
    date: '23 marzo 2025 alle 20:27',
    items: [
      {
        id: '1',
        name: 'Panino Porchetta',
        quantity: 2,
        price: 7.15
      },
      {
        id: '2',
        name: 'Coca Cola',
        quantity: 1,
        price: 2.50
      }
    ],
    total: 14.30,
    status: 'completed',
    deliveryAddress: 'Via Melo da Bari, 167, Studio D\'abbicco, 6 Piano',
    orderNumber: '#187277889'
  },
  {
    id: '3',
    restaurantId: '1',
    restaurantName: 'Lievità Pizzeria Rosticceria',
    restaurantImage: '/images/restaurants/lievita.png',
    date: '21 marzo 2025 alle 19:43',
    items: [
      {
        id: '1',
        name: 'Pizza Margherita',
        quantity: 1,
        price: 8.00
      },
      {
        id: '2',
        name: 'Patatine Fritte',
        quantity: 1,
        price: 3.50
      }
    ],
    total: 12.80,
    status: 'completed',
    deliveryAddress: 'Via Melo da Bari, 167, Studio D\'abbicco, 6 Piano',
    orderNumber: '#187277890'
  },
  {
    id: '4',
    restaurantId: '1',
    restaurantName: 'Lievità Pizzeria Rosticceria',
    restaurantImage: '/images/restaurants/lievita.png',
    date: '16 marzo 2025 alle 20:04',
    items: [
      {
        id: '1',
        name: 'Pizza Diavola',
        quantity: 1,
        price: 9.50
      },
      {
        id: '2',
        name: 'Acqua Naturale 50cl',
        quantity: 1,
        price: 2.00
      }
    ],
    total: 12.80,
    status: 'completed',
    deliveryAddress: 'Via Melo da Bari, 167, Studio D\'abbicco, 6 Piano',
    orderNumber: '#187277891'
  },
  {
    id: '5',
    restaurantId: '3',
    restaurantName: 'Hula Hawaiian Poke',
    restaurantImage: '/images/restaurants/hula.png',
    date: '12 marzo 2025 alle 12:36',
    items: [
      {
        id: '1',
        name: 'Poke Bowl Salmon',
        quantity: 1,
        price: 10.90
      },
      {
        id: '2',
        name: 'Acqua Naturale 50cl',
        quantity: 1,
        price: 1.98
      }
    ],
    total: 12.88,
    status: 'completed',
    deliveryAddress: 'Via Melo da Bari, 167, Studio D\'abbicco, 6 Piano',
    orderNumber: '#187277892'
  }
]; 