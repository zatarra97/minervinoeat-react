import React, { useState, useEffect } from 'react';
import DataTable from '../../Components/Table/DataTable';
import { Order } from '../../data/orders';
import { RestaurantOrder, restaurantOrders } from '../../data/restaurant-orders';

// Dati di esempio per gli ordini
const mockOrders: RestaurantOrder[] = restaurantOrders;

// Componente OrderCard per la visualizzazione a card
const OrderCard: React.FC<{ order: RestaurantOrder; getStatusText: (status: RestaurantOrder['status']) => string; getStatusClass: (status: RestaurantOrder['status']) => string; actions: any[] }> = ({ 
  order, 
  getStatusText, 
  getStatusClass, 
  actions 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">#{order.id}</h3>
          <p className="text-gray-600">{order.customer}</p>
        </div>
        <span className={`px-2 py-1 ${getStatusClass(order.status)} rounded-full text-xs`}>
          {getStatusText(order.status)}
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Data:</span>{' '}
          {new Date(order.date).toLocaleString('it-IT')}
        </p>
        <p className="text-sm">
          <span className="font-medium">Totale:</span>{' '}
          {order.total}
        </p>
        <p className="text-sm">
          <span className="font-medium">Pagamento:</span>{' '}
          {order.paymentMethod}
        </p>
      </div>
      <div className="mt-4 space-x-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => action.onClick(order)}
            className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
          >
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente principale degli ordini
const Orders: React.FC = () => {
  const [orders, setOrders] = useState<RestaurantOrder[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<RestaurantOrder[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Funzione per raggruppare gli ordini per stato
  const groupOrdersByStatus = (orders: RestaurantOrder[]) => {
    const groups = {
      pending: orders.filter(order => order.status === 'pending'),
      preparing: orders.filter(order => order.status === 'preparing'),
      completed: orders.filter(order => ['delivered', 'shipped'].includes(order.status)),
      cancelled: orders.filter(order => order.status === 'cancelled')
    };
    return groups;
  };

  // Configurazione delle colonne Kanban
  const statusColumns = [
    { id: 'pending', title: 'In attesa', color: 'bg-blue-50 border-blue-200' },
    { id: 'preparing', title: 'In preparazione', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'completed', title: 'Completato', color: 'bg-green-50 border-green-200' },
    { id: 'cancelled', title: 'Annullato', color: 'bg-red-50 border-red-200' }
  ];

  // Funzione per verificare se è mobile
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (isMobile && !selectedColumn && statusColumns.length > 0) {
      setSelectedColumn(statusColumns[0].id);
    }
  }, []);

  return (
    <div className="h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Gestione ordini di oggi</h1>
        
        {/* Controlli vista mobile/desktop */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-md cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Tabella
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-md cursor-pointer ${
                viewMode === 'cards' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable 
          columns={columns}
          data={filteredOrders}
          searchPlaceholder="Cerca per ID, cliente, totale o stato..."
          onSearch={setSearchQuery}
          actions={actions}
          filterOptions={filterOptions}
        />
      ) : (
        <div className="flex flex-col h-[calc(100vh-12rem)]">
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Cerca per ID, cliente, totale o stato..."
              className="w-full px-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Menu mobile per selezione colonna */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full px-4 py-2 bg-white border rounded-md flex justify-between items-center"
              >
                <span>{statusColumns.find(col => col.id === selectedColumn)?.title || 'Seleziona stato'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isMobileMenuOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                  {statusColumns.map(column => (
                    <button
                      key={column.id}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                        selectedColumn === column.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        setSelectedColumn(column.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <span>{column.title}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({groupOrdersByStatus(filteredOrders)[column.id as keyof ReturnType<typeof groupOrdersByStatus>].length})
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vista desktop */}
          <div className="hidden sm:flex gap-4 overflow-x-auto pb-4 h-full">
            {statusColumns.map(column => {
              const columnOrders = groupOrdersByStatus(filteredOrders)[column.id as keyof ReturnType<typeof groupOrdersByStatus>];
              return (
                <div 
                  key={column.id}
                  className={`flex-1 min-w-[300px] ${column.color} p-4 rounded-lg border`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{column.title}</h3>
                    <span className="bg-white px-2 py-1 rounded-full text-sm border border-gray-200">
                      {columnOrders.length}
                    </span>
                  </div>
                  <div className="space-y-4 overflow-y-auto min-h-[calc(100vh-20rem)]">
                    {columnOrders.map(order => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        getStatusText={getStatusText}
                        getStatusClass={getStatusClass}
                        actions={actions}
                      />
                    ))}
                    {columnOrders.length === 0 && (
                      <div className="text-center text-gray-500 py-4">
                        Nessun ordine
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vista mobile */}
          <div className="sm:hidden h-full">
            {selectedColumn && (
              <div className={`h-full ${statusColumns.find(col => col.id === selectedColumn)?.color} p-4 rounded-lg border`}>
                <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-20rem)]">
                  {groupOrdersByStatus(filteredOrders)[selectedColumn as keyof ReturnType<typeof groupOrdersByStatus>].map(order => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      getStatusText={getStatusText}
                      getStatusClass={getStatusClass}
                      actions={actions}
                    />
                  ))}
                  {groupOrdersByStatus(filteredOrders)[selectedColumn as keyof ReturnType<typeof groupOrdersByStatus>].length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      Nessun ordine
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
