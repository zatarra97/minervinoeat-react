import React, { useMemo } from 'react';
import moment from 'moment';
import 'moment/locale/it';

interface DeliveryTimeStepProps {
  deliveryType: 'delivery' | 'pickup';
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
  onNotesChange: (notes: string) => void;
  notes: string;
}

export const DeliveryTimeStep: React.FC<DeliveryTimeStepProps> = ({
  deliveryType,
  selectedTime,
  onTimeSelect,
  onNext,
  onBack,
  onNotesChange,
  notes
}) => {
  // Imposta la localizzazione italiana
  moment.locale('it');

  const timeSlots = useMemo(() => {
    const slots = [];
    const now = moment();
    const endOfDay = moment().endOf('day');

    // Arrotonda l'ora corrente al prossimo slot di 15 minuti
    const currentMinutes = now.minutes();
    const minutesToAdd = 15 - (currentMinutes % 15);
    let currentSlot = moment(now).add(minutesToAdd, 'minutes');

    while (currentSlot.isBefore(endOfDay)) {
      slots.push(currentSlot.format('HH:mm'));
      currentSlot.add(15, 'minutes');
    }

    return slots;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="container bg-white rounded-lg border border-gray-200 mx-auto p-4">
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-2 md:p-6">
          <h3 className="text-lg font-semibold my-4">
            Note per l'ordine (facoltativo)
          </h3>
          

          <div className="mt-4">
              <textarea
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                rows={3}
                placeholder="Es. Tagliare le pizze a fette, portare il resto per..."
              />
            </div>

          <h3 className="text-lg font-semibold my-4">
            Seleziona l'orario di {deliveryType === 'delivery' ? 'consegna' : 'ritiro'}
          </h3>

          <div className="space-y-4">
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="deliveryTime"
                value="asap"
                checked={selectedTime === 'asap'}
                onChange={() => onTimeSelect('asap')}
                className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
              />
              <span className="ml-3">Il prima possibile</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <label
                  key={time}
                  className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="deliveryTime"
                    value={time}
                    checked={selectedTime === time}
                    onChange={() => onTimeSelect(time)}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-3">{time}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="btn btn-gray"
          >
            Indietro
          </button>
          <button
            type="submit"
            className="btn btn-orange"
            disabled={!selectedTime}
          >
            Continua
          </button>
        </div>
      </div>
    </form>
  );
}; 