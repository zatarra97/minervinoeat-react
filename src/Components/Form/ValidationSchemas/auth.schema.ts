import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email è obbligatoria')
    .email('Formato email non valido'),
  password: z
    .string()
    .min(1, 'La password è obbligatoria')
    .min(8, 'La password deve essere di almeno 8 caratteri')
});

export const registerSchema = z.object({
  nome: z
    .string()
    .min(1, 'Il nome è obbligatorio')
    .min(2, 'Il nome deve essere di almeno 2 caratteri'),
  cognome: z
    .string()
    .min(1, 'Il cognome è obbligatorio')
    .min(2, 'Il cognome deve essere di almeno 2 caratteri'),
  telefono: z
    .string()
    .min(1, 'Il numero di telefono è obbligatorio')
    .regex(/^[0-9]+$/, 'Inserisci solo numeri')
    .min(10, 'Il numero deve essere di almeno 10 cifre'),
  email: z
    .string()
    .min(1, 'L\'email è obbligatoria')
    .email('Formato email non valido'),
  password: z
    .string()
    .min(1, 'La password è obbligatoria')
    .min(8, 'La password deve essere di almeno 8 caratteri'),
  confirmPassword: z
    .string()
    .min(1, 'La conferma password è obbligatoria')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Le password non coincidono",
  path: ["confirmPassword"]
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>; 