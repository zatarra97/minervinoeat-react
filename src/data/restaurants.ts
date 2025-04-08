import { Restaurant } from '../types/restaurant';

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'pizzeria', name: 'Pizzeria', icon: '🍕' },
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
    name: 'Sissy D\'Amato',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    deliveryTime: '20-30 min',
    rating: 4.8,
    distance: '1.2 km',
    reviewCount: 234,
    deliveryFee: '€2.50',
    minOrder: 10.00,
    category: 'pizzeria',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 4.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Dolci',
        items: [
          {
            name: 'Tiramisu',
            description: 'vasetto',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Panna Cotta',
            description: 'vasetto',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Cheesecake frutti di bosco',
            description: 'vasetto',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Dolce Vita Pasticceria',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    deliveryTime: '25-35 min',
    rating: 4.9,
    distance: '2.5 km',
    reviewCount: 187,
    deliveryFee: '€3.00',
    minOrder: 15.00,
    category: 'pasticceria',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Rosticceria del Corso',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    deliveryTime: '30-40 min',
    rating: 4.6,
    distance: '3.1 km',
    reviewCount: 142,
    deliveryFee: '€3.50',
    minOrder: 12.00,
    category: 'rosticceria',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'pasta',
    rating: 4.5,
    reviewCount: 156,
    deliveryTime: '25-35 min',
    deliveryFee: '€3.00',
    minOrder: 18,
    distance: '1.7 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Green Salad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'healthy',
    rating: 4.3,
    reviewCount: 98,
    deliveryTime: '15-25 min',
    deliveryFee: '€2.00',
    minOrder: 12,
    distance: '1.1 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Dolce Vita',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'dessert',
    rating: 4.9,
    reviewCount: 215,
    deliveryTime: '20-30 min',
    deliveryFee: '€2.50',
    minOrder: 8,
    distance: '2.0 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Pizzeria Napoli',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    deliveryTime: '20-30 min',
    rating: 4.8,
    distance: '1.2 km',
    reviewCount: 234,
    deliveryFee: '€2.50',
    minOrder: 10.00,
    category: 'pizzeria',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'Dolce Vita Pasticceria',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    deliveryTime: '25-35 min',
    rating: 4.9,
    distance: '2.5 km',
    reviewCount: 187,
    deliveryFee: '€3.00',
    minOrder: 15.00,
    category: 'pasticceria',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '9',
    name: 'Rosticceria del Corso',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    deliveryTime: '30-40 min',
    rating: 4.6,
    distance: '3.1 km',
    reviewCount: 142,
    deliveryFee: '€3.50',
    minOrder: 12.00,
    category: 'rosticceria',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '10',
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'pasta',
    rating: 4.5,
    reviewCount: 156,
    deliveryTime: '25-35 min',
    deliveryFee: '€3.00',
    minOrder: 18,
    distance: '1.7 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '11',
    name: 'Green Salad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'healthy',
    rating: 4.3,
    reviewCount: 98,
    deliveryTime: '15-25 min',
    deliveryFee: '€2.00',
    minOrder: 12,
    distance: '1.1 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '12',
    name: 'Dolce Vita',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'dessert',
    rating: 4.9,
    reviewCount: 215,
    deliveryTime: '20-30 min',
    deliveryFee: '€2.50',
    minOrder: 8,
    distance: '2.0 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '13',
    name: 'Dolce Vita',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'dessert',
    rating: 4.9,
    reviewCount: 215,
    deliveryTime: '20-30 min',
    deliveryFee: '€2.50',
    minOrder: 8,
    distance: '2.0 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '14',
    name: 'Pizzeria Napoli',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    deliveryTime: '20-30 min',
    rating: 4.8,
    distance: '1.2 km',
    reviewCount: 234,
    deliveryFee: '€2.50',
    minOrder: 10.00,
    category: 'pizzeria',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '15',
    name: 'Dolce Vita Pasticceria',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    deliveryTime: '25-35 min',
    rating: 4.9,
    distance: '2.5 km',
    reviewCount: 187,
    deliveryFee: '€3.00',
    minOrder: 15.00,
    category: 'pasticceria',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '16',
    name: 'Rosticceria del Corso',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    deliveryTime: '30-40 min',
    rating: 4.6,
    distance: '3.1 km',
    reviewCount: 142,
    deliveryFee: '€3.50',
    minOrder: 12.00,
    category: 'rosticceria',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '17',
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'pasta',
    rating: 4.5,
    reviewCount: 156,
    deliveryTime: '25-35 min',
    deliveryFee: '€3.00',
    minOrder: 18,
    distance: '1.7 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '18',
    name: 'Green Salad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'healthy',
    rating: 4.3,
    reviewCount: 98,
    deliveryTime: '15-25 min',
    deliveryFee: '€2.00',
    minOrder: 12,
    distance: '1.1 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  },
  {
    id: '19',
    name: 'Dolce Vita',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'dessert',
    rating: 4.9,
    reviewCount: 215,
    deliveryTime: '20-30 min',
    deliveryFee: '€2.50',
    minOrder: 8,
    distance: '2.0 km',
    menu: [
      {
        category: 'Pizze Rosse',
        items: [
          {
            name: 'Marinara',
            description: 'Pomodoro, aglio, origano, olio EVO',
            price: 7.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Margherita',
            description: 'Pomodoro, mozzarella fior di latte, basilico, olio EVO',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Diavola',
            description: 'Pomodoro, mozzarella fior di latte, salame piccante, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Pizze Bianche',
        items: [
          {
            name: 'Quattro Formaggi',
            description: 'Mozzarella fior di latte, gorgonzola, parmigiano, provola affumicata',
            price: 10.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Boscaiola',
            description: 'Mozzarella fior di latte, funghi, salsiccia, olio EVO',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      },
      {
        category: 'Bevande',
        items: [
          {
            name: 'Coca Cola 33cl',
            description: 'Lattina',
            price: 3.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          },
          {
            name: 'Acqua Naturale 50cl',
            description: 'Bottiglia',
            price: 2.00,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
        ]
      }
    ]
  }
]; 