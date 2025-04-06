import { z } from 'zod';

export const personalDetailsSchema = z.object({
  street: z.string().min(1, 'La via è obbligatoria'),
  number: z.string().min(1, 'Il numero civico è obbligatorio'),
  floor: z.string().optional(),
  intercom: z.string().optional(),
  name: z.string().min(1, 'Il nome è obbligatorio'),
  phone: z.string().min(1, 'Il numero di telefono è obbligatorio'),
  city: z.string().min(1, 'La città è obbligatoria'),
  cap: z.string().min(1, 'Il CAP è obbligatorio')
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>; 