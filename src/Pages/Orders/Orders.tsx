import { useState } from 'react';
import { orders } from '../../data/orders';
import { Navbar } from '../../Components/Navbar/Navbar';

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleOrderClick = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  return (
    <div className="bg-gray-50 min-h-[80vh]">
      <Navbar searchQuery='' onSearchChange={() => {}} />
      <div className="container mx-auto px-4 py-5 lg:py-15">
        <div className="flex gap-8">

          {/* Lista ordini */}
          <div className={`flex-1 transition-all duration-300 ${
            showDetail ? 'hidden md:block md:max-w-1/3' : 'max-w-full'
          }`}>
            <h2 className="text-xl font-semibold mb-4">Cronologia ordini</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`p-4 special-rounded border cursor-pointer hover:border-primary transition-colors ${
                    selectedOrder?.id === order.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:bg-gray-100 hover:border-gray-300'
                  }`}
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16">
                      <img
                        src="https://picsum.photos/200/300"
                        alt={order.restaurantName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{order.restaurantName}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                      <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.total.toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dettaglio ordine */}
          {showDetail && selectedOrder && (
            <div className={`fixed md:relative inset-0 md:inset-auto z-50 md:z-auto bg-white md:bg-transparent md:w-full md:max-w-2/3 ${
              showDetail ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300`}>
              <div className="h-full md:h-auto overflow-y-auto">
                <div className="sticky top-0 bg-white md:bg-transparent border-b md:border-b-0 border-gray-200 p-4 mb-4 md:p-0">
                  <button
                    onClick={() => {
                      setShowDetail(false);
                      setSelectedOrder(null);
                    }}
                    className="flex items-center gap-2 text-gray-600 cursor-pointer"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Torna agli ordini</span>
                  </button>
                </div>

                <div className="p-4 md:p-6 md:special-rounded md:border md:border-gray-200 md:bg-white md:rounded-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-20 h-20">
                      <img
                        src="https://picsum.photos/200/300"
                        alt={selectedOrder.restaurantName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{selectedOrder.restaurantName}</h2>
                      <p className="text-gray-600">Ordine {selectedOrder.orderNumber}</p>
                      <p className="text-gray-600">{selectedOrder.date}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold">Dettaglio ordine</h3>
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p>
                            {item.quantity}x {item.name}
                          </p>
                          {item.notes && <p className="text-sm text-gray-600">{item.notes}</p>}
                        </div>
                        <p>{(item.price * item.quantity).toFixed(2)} €</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <p>Subtotale</p>
                      <p>{(selectedOrder.total - 1.30).toFixed(2)} €</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p>Costo di consegna</p>
                      <p>1.00 €</p>
                    </div>
                    {/*}
                    <div className="flex justify-between mb-2">
                      <p className="text-sm text-gray-600">Commissioni di servizio (22% IVA incl.)</p>
                      <p>0.30 €</p>
                    </div>
                    */}
                    <div className="flex justify-between font-semibold mt-4">
                      <p>Totale</p>
                      <p>{selectedOrder.total.toFixed(2)} €</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Consegnato a</h3>
                    <p className="text-gray-600">{selectedOrder.deliveryAddress}</p>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <h1 className="text-xl font-semibold mb-2">Ti andrebbe di dirci qualcosa in più?</h1>
                    <h3 className="font-semibold mb-2">Non utilizziamo un sistema di recensioni, ma se hai qualcosa da dire, puoi scrivercelo qui.</h3>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="text-2xl text-gray-300 hover:text-primary transition-colors"
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Vuoi dirci qualcosa di più?"
                      className="w-full mt-4 p-3 border rounded-lg resize-none"
                      rows={3}
                    />
                    <button className="mt-4 btn btn-orange w-full justify-end">
                      Invia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 