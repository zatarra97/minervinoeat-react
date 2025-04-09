import React, { useState } from 'react';
import { startOfMonth, endOfMonth, isSameMonth, isToday, addMonths, subMonths, isSameDay } from 'date-fns';
import format from 'date-fns/format';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';

interface ClosureEvent {
  startDate: Date;
  endDate: Date;
  reason: string;
}

interface RestaurantSchedule {
  weeklyClosingDays: string[];
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddingClosure, setIsAddingClosure] = useState(false);
  const [newClosure, setNewClosure] = useState<Partial<ClosureEvent>>({});
  const [closureEvents, setClosureEvents] = useState<ClosureEvent[]>([
    {
      startDate: new Date(2024, 3, 15),
      endDate: new Date(2024, 3, 22),
      reason: "Ferie pasquali"
    }
  ]);

  // Esempio di configurazione del ristorante (da collegare con il profilo)
  const restaurantSchedule: RestaurantSchedule = {
    weeklyClosingDays: ['Lunedì'],
    openingHours: {
      Martedì: { open: "12:00", close: "23:00" },
      Mercoledì: { open: "12:00", close: "23:00" },
      Giovedì: { open: "12:00", close: "23:00" },
      Venerdì: { open: "12:00", close: "23:00" },
      Sabato: { open: "12:00", close: "23:00" },
      Domenica: { open: "12:00", close: "23:00" }
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isClosureDay = (date: Date) => {
    // Controlla se è un giorno di chiusura settimanale
    const dayName = format(date, 'EEEE');
    if (restaurantSchedule.weeklyClosingDays.includes(dayName)) {
      return true;
    }

    // Controlla se è all'interno di un periodo di chiusura
    return closureEvents.some(closure => {
      const startDate = new Date(closure.startDate);
      const endDate = new Date(closure.endDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      const checkDate = new Date(date);
      checkDate.setHours(12, 0, 0, 0);
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  const getClosureReason = (date: Date): string | null => {
    // Controlla se è all'interno di un periodo di chiusura
    const closure = closureEvents.find(closure => {
      const startDate = new Date(closure.startDate);
      const endDate = new Date(closure.endDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      const checkDate = new Date(date);
      checkDate.setHours(12, 0, 0, 0);
      return checkDate >= startDate && checkDate <= endDate;
    });
    
    if (closure) {
      return closure.reason;
    }
    
    const dayName = format(date, 'EEEE');
    if (restaurantSchedule.weeklyClosingDays.includes(dayName)) {
      return "Chiusura settimanale";
    }
    return null;
  };

  const handleAddClosure = () => {
    if (newClosure.startDate && newClosure.endDate && newClosure.reason) {
      setClosureEvents(prev => [...prev, newClosure as ClosureEvent]);
      setNewClosure({});
      setIsAddingClosure(false);
    }
  };

  const handleDeleteClosure = (closureToDelete: ClosureEvent) => {
    setClosureEvents(prev => 
      prev.filter(closure => 
        closure.startDate !== closureToDelete.startDate || 
        closure.endDate !== closureToDelete.endDate
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Calendario */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Calendario Attività</h2>
          <button
            onClick={() => setIsAddingClosure(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Aggiungi Chiusura
          </button>
        </div>

        {/* Navigazione mese */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Griglia giorni della settimana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Griglia calendario */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="h-24 bg-gray-50 rounded-lg" />
          ))}
          
          {daysInMonth.map((day: Date) => {
            const isClosed = isClosureDay(day);
            const closureReason = getClosureReason(day);
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

            return (
              <div
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`h-24 p-2 rounded-lg border transition-colors cursor-pointer relative ${
                  isSameMonth(day, currentDate)
                    ? 'bg-white'
                    : 'bg-gray-50'
                } ${
                  isToday(day)
                    ? 'border-orange-500'
                    : 'border-gray-200'
                } ${
                  isSelected
                    ? 'ring-2 ring-orange-500'
                    : ''
                } ${
                  isClosed
                    ? 'bg-red-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`text-sm font-semibold ${
                    isClosed ? 'text-red-600' : ''
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {isClosed && (
                    <span className="text-xs text-red-600 font-medium">
                      Chiuso
                    </span>
                  )}
                </div>
                {closureReason && (
                  <div className="absolute bottom-1 left-1 right-1">
                    <p className="text-xs text-red-600 truncate">
                      {closureReason}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista Chiusure */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Periodi di Chiusura</h3>
        <div className="space-y-4">
          {closureEvents.map((closure, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100"
            >
              <div>
                <p className="font-medium text-red-800">
                  {closure.reason}
                </p>
                <p className="text-sm text-red-600">
                  Dal {format(closure.startDate, 'd MMMM yyyy')} al{' '}
                  {format(closure.endDate, 'd MMMM yyyy')}
                </p>
              </div>
              <button
                onClick={() => handleDeleteClosure(closure)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Aggiungi Chiusura */}
      {isAddingClosure && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-200 m-4">
            <h3 className="text-lg font-semibold mb-4">Aggiungi Periodo di Chiusura</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Inizio
                </label>
                <input
                  type="date"
                  value={newClosure.startDate ? format(newClosure.startDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setNewClosure(prev => ({
                    ...prev,
                    startDate: new Date(e.target.value)
                  }))}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Fine
                </label>
                <input
                  type="date"
                  value={newClosure.endDate ? format(newClosure.endDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setNewClosure(prev => ({
                    ...prev,
                    endDate: new Date(e.target.value)
                  }))}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo
                </label>
                <input
                  type="text"
                  value={newClosure.reason || ''}
                  onChange={(e) => setNewClosure(prev => ({
                    ...prev,
                    reason: e.target.value
                  }))}
                  placeholder="es. Ferie estive"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsAddingClosure(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annulla
              </button>
              <button
                onClick={handleAddClosure}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Aggiungi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
