import React from 'react';
import { Restaurant } from '../../../types/restaurant';
import { PersonalDetailsFormData } from '../OrderConfirmation';
interface OrderSummaryStepProps {
  restaurant: Restaurant;
  cartItems: Array<{ name: string; quantity: number; price: number; }>;
  personalDetails: PersonalDetailsFormData;
  deliveryType: 'delivery' | 'pickup';
  selectedTime: string;
  notes: string;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export const OrderSummaryStep: React.FC<OrderSummaryStepProps> = ({
  restaurant,
  cartItems,
  personalDetails,
  deliveryType,
  selectedTime,
  notes,
  onBack,
  onConfirm,
  isSubmitting
}) => {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = deliveryType === 'delivery' ? parseFloat(restaurant.deliveryCost.toString()) : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="container bg-white rounded-lg border border-gray-200 mx-auto p-4">
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-2 md:p-6">
          <h3 className="text-xl font-bold mb-4">Riepilogo ordine</h3>
          
          <div className="space-y-6">
            {/* Dettagli Ristorante */}
            <div>
              <h4 className="font-semibold mb-2">Ristorante</h4>
              <p>{restaurant.name}</p>
            </div>

            {/* Articoli ordinati */}
            <div>
              <h4 className="font-semibold mb-2">Il tuo ordine</h4>
              <div className="space-y-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dettagli consegna/ritiro */}
            <div>
              <h4 className="font-semibold mb-2">
                {deliveryType === 'delivery' ? 'Indirizzo di consegna' : 'Indirizzo del ristorante'}
              </h4>
              {deliveryType === 'delivery' ? (
                <div className="space-y-1">
                  <p>Via {personalDetails.street}, {personalDetails.number}</p>
                  {personalDetails.floor && <p>Piano: {personalDetails.floor}</p>}
                  <p>Minervino Murge, 76013</p>
                  {personalDetails.intercom && <p>Citofono: {personalDetails.intercom}</p>}
                </div>
              ) : (
                <p>Via del Ristorante, 123</p>
              )}
            </div>

            {/* Orario */}
            <div>
              <h4 className="font-semibold mb-2">
                Orario di {deliveryType === 'delivery' ? 'consegna' : 'ritiro'}
              </h4>
              <p>{selectedTime === 'asap' ? 'Il prima possibile' : selectedTime}</p>
            </div>

            {/* Dettagli cliente */}
            <div>
              <h4 className="font-semibold mb-2">I tuoi dati</h4>
              <div className="space-y-1">
                <p>{personalDetails.name}</p>
                <p>{personalDetails.phone}</p>
              </div>
            </div>

            {/* Note */}
            {notes && (
              <div>
                <h4 className="font-semibold mb-2">Note per l'ordine</h4>
                <p className="text-gray-600">{notes}</p>
              </div>
            )}

            {/* Totale */}
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotale</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Consegna</span>
                    <span>{parseFloat(restaurant.deliveryCost.toString()) === 0 ? 'gratis' : `€${restaurant.deliveryCost}`}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Totale</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="btn btn-gray"
            disabled={isSubmitting}
          >
            Indietro
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn btn-orange"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Conferma in corso...' : 'Conferma ordine'}
          </button>
        </div>
      </div>
    </div>
  );
}; 