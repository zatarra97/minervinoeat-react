import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Ristorante</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 special-rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Ordini Oggi</h2>
          <p className="text-3xl font-bold text-orange-600">12</p>
          <p className="text-sm text-gray-500 mt-2">+15% rispetto a ieri</p>
        </div>
        <div className="bg-white p-6 special-rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Incasso Oggi</h2>
          <p className="text-3xl font-bold text-green-600">€247,50</p>
          <p className="text-sm text-gray-500 mt-2">+8% rispetto a ieri</p>
        </div>
        <div className="bg-white p-6 special-rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Nuovi Clienti</h2>
          <p className="text-3xl font-bold text-blue-600">3</p>
          <p className="text-sm text-gray-500 mt-2">+2 rispetto a ieri</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 special-rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Ordini Recenti</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">ID Ordine</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Totale</th>
                  <th className="px-4 py-3">Stato</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">#1234</td>
                  <td className="px-4 py-3">Mario Rossi</td>
                  <td className="px-4 py-3">€35,50</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">In preparazione</span></td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">#1233</td>
                  <td className="px-4 py-3">Giulia Bianchi</td>
                  <td className="px-4 py-3">€42,00</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Consegnato</span></td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">#1232</td>
                  <td className="px-4 py-3">Luca Verdi</td>
                  <td className="px-4 py-3">€28,00</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Consegnato</span></td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">#1231</td>
                  <td className="px-4 py-3">Anna Neri</td>
                  <td className="px-4 py-3">€22,50</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">In transito</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 special-rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Piatti Più Venduti</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
              <div className="flex-1">
                <h3 className="font-medium">Margherita</h3>
                <p className="text-sm text-gray-500">Vendite: 35</p>
              </div>
              <div className="text-right">
                <p className="font-medium">€8,00</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
              <div className="flex-1">
                <h3 className="font-medium">Diavola</h3>
                <p className="text-sm text-gray-500">Vendite: 28</p>
              </div>
              <div className="text-right">
                <p className="font-medium">€9,50</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
              <div className="flex-1">
                <h3 className="font-medium">Quattro Stagioni</h3>
                <p className="text-sm text-gray-500">Vendite: 22</p>
              </div>
              <div className="text-right">
                <p className="font-medium">€10,00</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
              <div className="flex-1">
                <h3 className="font-medium">Capricciosa</h3>
                <p className="text-sm text-gray-500">Vendite: 19</p>
              </div>
              <div className="text-right">
                <p className="font-medium">€9,50</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 special-rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Attività Recenti</h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Nuovo ordine ricevuto</p>
                <p className="text-xs text-gray-500">10 minuti fa</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Ordine #1233 completato</p>
                <p className="text-xs text-gray-500">30 minuti fa</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Ordine #1231 in consegna</p>
                <p className="text-xs text-gray-500">1 ora fa</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 special-rounded shadow">
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-lg">Valutazione Media</h3>
              </div>
              <div className="flex">
                <span className="text-2xl font-bold text-yellow-500 mr-2">4.7</span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'} ${star === 5 ? 'text-yellow-300' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Recensioni Recenti</h3>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Laura B.</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">Pizza eccellente e consegna velocissima. Complimenti!</p>
                <p className="text-xs text-gray-500 mt-1">2 giorni fa</p>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Marco T.</span>
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <svg 
                        key={star} 
                        className="w-4 h-4 text-yellow-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Buona la pizza, ma consegna in ritardo di 15 minuti.</p>
                <p className="text-xs text-gray-500 mt-1">3 giorni fa</p>
              </div>
            </div>
            <button className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium">
              Visualizza tutte le recensioni →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 