import React, { useState, useEffect } from 'react';
import DataTable from '../../Components/Table/DataTable';
import { Order } from '../../data/orders';
import { RestaurantOrder, restaurantOrders } from '../../data/restaurant-orders';


// Dati di esempio per gli ordini
const mockOrders: RestaurantOrder[] = restaurantOrders;

// Componente principale degli ordini
const Orders: React.FC = () => {
  const [orders, setOrders] = useState<RestaurantOrder[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<RestaurantOrder[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');

  // Effetto per filtrare gli ordini quando cambia la query di ricerca
  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = orders.filter(order => 
        order.id.toLowerCase().includes(lowercasedQuery) ||
        order.customer.toLowerCase().includes(lowercasedQuery) ||
        order.total.toLowerCase().includes(lowercasedQuery) ||
        getStatusText(order.status).toLowerCase().includes(lowercasedQuery)
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchQuery, orders]);

  // Funzione per ottenere il testo dello stato dell'ordine
  const getStatusText = (status: RestaurantOrder['status']): string => {
    switch(status) {
      case 'pending': return 'In attesa';
      case 'preparing': return 'In preparazione';
      case 'shipped': return 'In transito';
      case 'delivered': return 'Consegnato';
      case 'cancelled': return 'Annullato';
      default: return status;
    }
  };

  // Funzione per ottenere la classe di colore per lo stato
  const getStatusClass = (status: RestaurantOrder['status']): string => {
    switch(status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Configurazione delle colonne per la tabella
  const columns = [
    {
      header: 'ID Ordine',
      accessor: 'id',
    },
    {
      header: 'Cliente',
      accessor: 'customer',
    },
    {
      header: 'Data',
      accessor: 'date',
      cell: (row: RestaurantOrder) => {
        const date = new Date(row.date);
        return <span>{date.toLocaleString('it-IT')}</span>;
      }
    },
    {
      header: 'Totale',
      accessor: 'total',
    },
    {
      header: 'Stato',
      accessor: 'status',
      cell: (row: RestaurantOrder) => (
        <span className={`px-2 py-1 ${getStatusClass(row.status)} rounded-full text-xs`}>
          {getStatusText(row.status)}
        </span>
      )
    }
  ];

  // Configurazione delle azioni per ogni riga
  const actions = [
    {
      name: 'Vedi dettagli',
      onClick: (order: Order) => {
        console.log('Visualizza dettagli per ordine:', order.id);
        // Qui si potrebbe aprire un modale o navigare a una pagina di dettaglio
      }
    },
    {
      name: 'Modifica stato',
      onClick: (order: Order) => {
        console.log('Modifica stato per ordine:', order.id);
        // Qui si potrebbe aprire un dropdown o un modale per cambiare lo stato
      }
    }
  ];

  // Configurazione dei filtri
  const filterOptions = [
    {
      name: 'Stato',
      options: [
        { id: 'pending', label: 'In attesa', count: orders.filter(o => o.status === 'pending').length },
        { id: 'preparing', label: 'In preparazione', count: orders.filter(o => o.status === 'preparing').length },
        { id: 'shipped', label: 'In transito', count: orders.filter(o => o.status === 'shipped').length },
        { id: 'delivered', label: 'Consegnato', count: orders.filter(o => o.status === 'delivered').length },
        { id: 'cancelled', label: 'Annullato', count: orders.filter(o => o.status === 'cancelled').length }
      ],
      onFilter: (selected: string[]) => {
        if (selected.length === 0) {
          setFilteredOrders(orders);
        } else {
          const filtered = orders.filter(order => selected.includes(order.status));
          setFilteredOrders(filtered);
        }
      }
    },
    {
      name: 'Metodo di Pagamento',
      options: [
        { id: 'credit-card', label: 'Carta di credito', count: orders.filter(o => o.paymentMethod === 'Carta di credito').length },
        { id: 'paypal', label: 'PayPal', count: orders.filter(o => o.paymentMethod === 'PayPal').length },
        { id: 'cash', label: 'Contanti', count: orders.filter(o => o.paymentMethod === 'Contanti').length }
      ],
      onFilter: (selected: string[]) => {
        if (selected.length === 0) {
          setFilteredOrders(orders);
        } else {
          const methodMap: Record<string, string> = {
            'credit-card': 'Carta di credito',
            'paypal': 'PayPal',
            'cash': 'Contanti'
          };
          const methods = selected.map(s => methodMap[s]);
          const filtered = orders.filter(order => methods.includes(order.paymentMethod));
          setFilteredOrders(filtered);
        }
      }
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestione Ordini</h1>
      
      <DataTable 
        columns={columns}
        data={filteredOrders}
        searchPlaceholder="Cerca per ID, cliente, totale o stato..."
        onSearch={setSearchQuery}
        actions={actions}
        filterOptions={filterOptions}
      />
    </div>
  );
};

export default Orders;
