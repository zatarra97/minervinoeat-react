import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { OrderStepper } from './OrderStepper/OrderStepper';
import { PersonalDetailsStep } from './OrderSteps/PersonalDetailsStep';
import { DeliveryTimeStep } from './OrderSteps/DeliveryTimeStep';
import { OrderSummaryStep } from './OrderSteps/OrderSummaryStep'
import { Restaurant } from '../../types/restaurant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface LocationState {
  restaurant: Restaurant;
  cartItems: Array<{ name: string; quantity: number; price: number; }>;
  deliveryType: 'delivery' | 'pickup';
}

export interface PersonalDetailsFormData {
  street: string;
  number: string;
  floor?: string;
  city: string;
  cap: string;
  intercom?: string;
  name: string;
  phone: string;
}

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurant, cartItems, deliveryType } = location.state as LocationState;

  const [currentStep, setCurrentStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsFormData>({
    street: '',
    number: '',
    floor: '',
    city: '',
    cap: '',
    intercom: '',
    name: '',
    phone: ''
  });
  const [selectedTime, setSelectedTime] = useState('asap');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handlePersonalDetailsChange = (data: Partial<PersonalDetailsFormData>) => {
    setPersonalDetails(prev => ({ ...prev, ...data }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleConfirmOrder = () => {
    // Qui implementeremo la logica per inviare l'ordine al backend
    console.log('Ordine confermato:', {
      restaurant,
      cartItems,
      personalDetails,
      deliveryType,
      selectedTime
    });
    
    setOrderConfirmed(true);
  };

  const handleBackToRestaurant = () => {
    navigate(`/dettaglio/${restaurant.id}`, {
      state: {
        cartItems,
        deliveryType
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-2 md:px-4">
        <div className="max-w-4xl mx-auto">
          {!orderConfirmed ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={handleBackToRestaurant}
                  className="flex items-center text-orange-500 hover:text-orange-600 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Torna al ristorante
                </button>
              </div>

              <OrderStepper 
                currentStep={currentStep}
                deliveryType={deliveryType}
              />

              <div className="mt-8">
                {currentStep === 1 && (
                  <PersonalDetailsStep
                    formData={personalDetails}
                    onChange={handlePersonalDetailsChange}
                    onNext={handleNext}
                    deliveryType={deliveryType}
                  />
                )}

                {currentStep === 2 && (
                  <DeliveryTimeStep
                    deliveryType={deliveryType}
                    selectedTime={selectedTime}
                    onTimeSelect={handleTimeSelect}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 3 && (
                  <OrderSummaryStep
                    restaurant={restaurant}
                    cartItems={cartItems}
                    personalDetails={personalDetails}
                    deliveryType={deliveryType}
                    selectedTime={selectedTime}
                    onBack={handleBack}
                    onConfirm={handleConfirmOrder}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <FontAwesomeIcon 
                icon={faCheckCircle} 
                className="text-green-500 text-6xl mb-4" 
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ordine Confermato!
              </h2>
              <p className="text-gray-600 mb-6">
                Il tuo ordine è stato ricevuto con successo. Riceverai una conferma via e-mail.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-orange"
                >
                  Torna alla home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 