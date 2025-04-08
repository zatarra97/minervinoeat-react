

// Definizione del tipo per un ordine
export interface RestaurantOrder {
    id: string;
    customer: string;
    date: string;
    total: string;
    status: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
    deliveryAddress: string;
    paymentMethod: string;
    items: {
      id: string;
      name: string;
      quantity: number;
      price: string;
    }[];
}

export const restaurantOrders: RestaurantOrder[] = [
    {
      id: "#1234",
      customer: "Mario Rossi",
      date: "2023-06-15 19:30",
      total: "€35,50",
      status: "preparing",
      deliveryAddress: "Via Roma 123, Milano",
      paymentMethod: "Carta di credito",
      items: [
        { id: "p1", name: "Pizza Margherita", quantity: 2, price: "€16,00" },
        { id: "p2", name: "Pizza Diavola", quantity: 1, price: "€9,50" },
        { id: "p3", name: "Coca Cola 33cl", quantity: 2, price: "€4,00" }
      ]
    },
    {
      id: "#1233",
      customer: "Giulia Bianchi",
      date: "2023-06-15 18:45",
      total: "€42,00",
      status: "delivered",
      deliveryAddress: "Via Dante 45, Milano",
      paymentMethod: "PayPal",
      items: [
        { id: "p4", name: "Pizza Quattro Stagioni", quantity: 1, price: "€10,00" },
        { id: "p5", name: "Pizza Capricciosa", quantity: 1, price: "€9,50" },
        { id: "p6", name: "Arancini", quantity: 4, price: "€8,00" },
        { id: "p7", name: "Birra Moretti 66cl", quantity: 2, price: "€10,00" }
      ]
    },
    {
      id: "#1232",
      customer: "Luca Verdi",
      date: "2023-06-15 18:00",
      total: "€28,00",
      status: "delivered",
      deliveryAddress: "Via Garibaldi 78, Milano",
      paymentMethod: "Contanti",
      items: [
        { id: "p1", name: "Pizza Margherita", quantity: 1, price: "€8,00" },
        { id: "p8", name: "Pizza Prosciutto e Funghi", quantity: 1, price: "€10,00" },
        { id: "p9", name: "Tiramisù", quantity: 2, price: "€10,00" }
      ]
    },
    {
      id: "#1231",
      customer: "Anna Neri",
      date: "2023-06-15 17:30",
      total: "€22,50",
      status: "shipped",
      deliveryAddress: "Via Milano 56, Sesto San Giovanni",
      paymentMethod: "Carta di credito",
      items: [
        { id: "p10", name: "Calzone", quantity: 1, price: "€10,00" },
        { id: "p11", name: "Insalata Mista", quantity: 1, price: "€4,50" },
        { id: "p12", name: "Acqua 1L", quantity: 2, price: "€3,00" },
        { id: "p13", name: "Panna Cotta", quantity: 1, price: "€5,00" }
      ]
    },
    {
      id: "#1230",
      customer: "Marco Rossi",
      date: "2023-06-15 17:00",
      total: "€48,50",
      status: "delivered",
      deliveryAddress: "Via Torino 12, Milano",
      paymentMethod: "Contanti",
      items: [
        { id: "p14", name: "Pizza Bufala", quantity: 2, price: "€22,00" },
        { id: "p15", name: "Patatine Fritte", quantity: 2, price: "€7,00" },
        { id: "p16", name: "Costine di maiale", quantity: 1, price: "€12,50" },
        { id: "p17", name: "Coca Cola 1L", quantity: 1, price: "€3,00" }
      ]
    },
    {
      id: "#1229",
      customer: "Laura Gialli",
      date: "2023-06-15 16:30",
      total: "€24,00",
      status: "cancelled",
      deliveryAddress: "Via Vittorio Emanuele 34, Milano",
      paymentMethod: "PayPal",
      items: [
        { id: "p18", name: "Pizza Napoli", quantity: 2, price: "€18,00" },
        { id: "p19", name: "Focaccia", quantity: 1, price: "€3,00" },
        { id: "p20", name: "Fanta 33cl", quantity: 1, price: "€2,00" }
      ]
    },
    {
      id: "#1228",
      customer: "Francesco Blu",
      date: "2023-06-15 16:00",
      total: "€31,00",
      status: "delivered",
      deliveryAddress: "Via Manzoni 23, Milano",
      paymentMethod: "Carta di credito",
      items: [
        { id: "p21", name: "Pizza Vegetariana", quantity: 1, price: "€9,50" },
        { id: "p22", name: "Pizza Frutti di Mare", quantity: 1, price: "€12,50" },
        { id: "p23", name: "Insalata di Mare", quantity: 1, price: "€9,00" }
      ]
    },
    {
      id: "#1227",
      customer: "Alessandra Verde",
      date: "2023-06-15 15:30",
      total: "€19,50",
      status: "pending",
      deliveryAddress: "Via Leopardi 67, Milano",
      paymentMethod: "Carta di credito",
      items: [
        { id: "p24", name: "Pizza Regina", quantity: 1, price: "€11,00" },
        { id: "p25", name: "Bruschette", quantity: 2, price: "€5,00" },
        { id: "p26", name: "Acqua Frizzante 1L", quantity: 1, price: "€1,50" }
      ]
    }
  ];