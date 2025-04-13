import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField } from '../../../Components/Form/Fields/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface PersonalDetailsStepProps {
  formData: PersonalDetailsFormData;
  onChange: (data: Partial<PersonalDetailsFormData>) => void;
  onNext: () => void;
  deliveryType: 'delivery' | 'pickup';
}

export type PersonalDetailsFormData = {
  street?: string;
  number?: string;
  floor?: string;
  intercom?: string;
  name: string;
  phone: string;
};

export function PersonalDetailsStep({ formData, onChange, onNext, deliveryType }: PersonalDetailsStepProps) {
  const baseSchema = z.object({
    name: z.string().min(1, 'Il nome è obbligatorio'),
    phone: z.string().min(1, 'Il numero di telefono è obbligatorio')
  });

  const deliverySchema = z.object({
    street: z.string().min(1, 'La via è obbligatoria'),
    number: z.string().min(1, 'Il numero civico è obbligatorio'),
    floor: z.string().optional(),
    intercom: z.string().optional(),
  });

  const personalDetailsSchema = deliveryType === 'delivery' 
    ? baseSchema.merge(deliverySchema)
    : baseSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData
  });

  const onSubmit = (data: PersonalDetailsFormData) => {
    onChange(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Dettagli personali</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Nome"
            name="name"
            register={register}
            error={errors.name?.message}
          />

          <TextField
            label="Telefono"
            name="phone"
            type="tel"
            register={register}
            error={errors.phone?.message}
          />
        </div>

        {deliveryType === 'delivery' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="Via"
                name="street"
                register={register}
                error={errors.street?.message}
              />

              <TextField
                label="Numero civico"
                name="number"
                register={register}
                error={errors.number?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="Piano (facoltativo)"
                name="floor"
                register={register}
                error={errors.floor?.message}
              />

              <TextField
                label="Citofono (facoltativo)"
                name="intercom"
                register={register}
                error={errors.intercom?.message}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full btn btn-orange mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              Caricamento...
            </>
          ) : (
            'Avanti'
          )}
        </button>
      </div>
    </form>
  );
} 