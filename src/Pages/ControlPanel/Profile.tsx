import React, { useState } from 'react';

interface RestaurantProfile {
  name: string;
  description: string;
  coverImage: string;
  profileImage: string;
  address: string;
  phone: string;
  email: string;
  weeklyClosingDays: string[];
  services: {
    pickup: boolean;
    delivery: boolean;
    deliveryFee: number;
  };
  minimumOrder: number;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
}

const daysOfWeek = [
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
  'Domenica'
];

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<RestaurantProfile>({
    name: "Ristorante Example",
    description: "La migliore cucina italiana in città",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    profileImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    address: "Via Roma 123, Milano",
    phone: "+39 02 1234567",
    email: "info@ristoranteexample.it",
    weeklyClosingDays: ['Lunedì'],
    services: {
      pickup: true,
      delivery: true,
      deliveryFee: 3.50
    },
    minimumOrder: 20,
    openingHours: {
      Martedì: { open: "12:00", close: "23:00" },
      Mercoledì: { open: "12:00", close: "23:00" },
      Giovedì: { open: "12:00", close: "23:00" },
      Venerdì: { open: "12:00", close: "23:00" },
      Sabato: { open: "12:00", close: "23:00" },
      Domenica: { open: "12:00", close: "23:00" }
    }
  });

  const handleImageUpload = (type: 'cover' | 'profile') => {
    // TODO: Implementare l'upload delle immagini
    console.log('Upload immagine', type);
  };

  const toggleClosingDay = (day: string) => {
    setProfile(prev => ({
      ...prev,
      weeklyClosingDays: prev.weeklyClosingDays.includes(day)
        ? prev.weeklyClosingDays.filter(d => d !== day)
        : [...prev.weeklyClosingDays, day]
    }));
  };

  const handleServiceToggle = (service: 'pickup' | 'delivery') => {
    setProfile(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service]
      }
    }));
  };

  const handleDeliveryFeeChange = (fee: string) => {
    setProfile(prev => ({
      ...prev,
      services: {
        ...prev.services,
        deliveryFee: parseFloat(fee) || 0
      }
    }));
  };

  const handleMinimumOrderChange = (amount: string) => {
    setProfile(prev => ({
      ...prev,
      minimumOrder: parseFloat(amount) || 0
    }));
  };

  const handleOpeningHoursChange = (day: string, type: 'open' | 'close', value: string) => {
    setProfile(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [type]: value
        }
      }
    }));
  };

  return (
    <div className="mx-auto space-y-8 xl:flex xl:space-y-0 xl:space-x-6 w-full">
      {/* Colonna Sinistra: Copertina, Logo e Info Base */}
      <div className="xl:w-1/2 space-y-8">
        {/* Immagine di Copertina */}
        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={profile.coverImage}
            alt="Copertina ristorante"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => handleImageUpload('cover')}
            className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            Modifica copertina
          </button>
        </div>

        {/* Immagine Profilo e Info Base */}
        <div className="relative -mt-20 ml-2">
          <div className="relative">
            <img
              src={profile.profileImage}
              alt="Logo ristorante"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button
              onClick={() => handleImageUpload('profile')}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Informazioni Base */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Informazioni Base</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Attività</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
              <textarea
                value={profile.description}
                onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Colonna Destra: Giorni Chiusura, Orari e Servizi */}
      <div className="xl:w-1/2 space-y-8">
        {/* Giorni di Chiusura */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Giorni di Chiusura</h2>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(day => (
              <button
                key={day}
                onClick={() => toggleClosingDay(day)}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  profile.weeklyClosingDays.includes(day)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Orari di Apertura */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-6">Orari di Apertura</h2>
          <div className="">
            {daysOfWeek.map(day => (
              <div 
                key={day} 
                className={`flex flex-col sm:flex-row sm:items-center p-3 rounded-lg transition-colors ${
                  profile.weeklyClosingDays.includes(day) ? 'bg-red-50 mb-1' : ''
                }`}
              >
                <div className="flex items-center justify-between sm:w-32 mb-2 sm:mb-0">
                  <span className="font-medium text-gray-900">{day}</span>
                  {profile.weeklyClosingDays.includes(day) && (
                    <span className="text-red-500 text-sm italic sm:hidden">Chiuso</span>
                  )}
                </div>
                {profile.weeklyClosingDays.includes(day) ? (
                  <span className="hidden sm:block text-red-500 italic">Chiuso</span>
                ) : (
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="flex flex-col flex-1">
                      <label className="text-xs text-gray-500 mb-1">Apertura</label>
                      <input
                        type="time"
                        value={profile.openingHours[day]?.open || ''}
                        onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                        className="p-2 border rounded-lg w-full bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <span className="self-end mb-2 text-gray-400">-</span>
                    <div className="flex flex-col flex-1">
                      <label className="text-xs text-gray-500 mb-1">Chiusura</label>
                      <input
                        type="time"
                        value={profile.openingHours[day]?.close || ''}
                        onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                        className="p-2 border rounded-lg w-full bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Servizi */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Servizi</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={profile.services.pickup}
                  onChange={() => handleServiceToggle('pickup')}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2">Ritiro in sede</span>
              </label>
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordine minimo (€)
                </label>
                <input
                  type="number"
                  value={profile.minimumOrder}
                  onChange={(e) => handleMinimumOrderChange(e.target.value)}
                  min="0"
                  step="0.50"
                  className="w-32 p-2 border rounded-lg"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={profile.services.delivery}
                    onChange={() => handleServiceToggle('delivery')}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2">Consegna a domicilio</span>
                </label>
              </div>

              {profile.services.delivery && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Costo di consegna (€)
                    </label>
                    <input
                      type="number"
                      value={profile.services.deliveryFee}
                      onChange={(e) => handleDeliveryFeeChange(e.target.value)}
                      min="0"
                      step="0.50"
                      className="w-32 p-2 border rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pulsante Salva */}
        <div className="flex justify-end">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer">
            Salva Modifiche
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
