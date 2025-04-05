import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '../../Components/Form/ValidationSchemas/auth.schema';
import { TextField } from '../../Components/Form/Fields/TextField';
import { cognitoService } from '../../services/cognito';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      await cognitoService.signUp({
        email: data.email,
        password: data.password,
        nome: data.nome,
        cognome: data.cognome,
        telefono: data.telefono
      });
      // Dopo la registrazione, reindirizza alla pagina di conferma o login
      navigate('/accesso/login');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Errore durante la registrazione. Riprova.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white px-4 py-8 md:p-8 special-rounded shadow-sm max-w-md w-full space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800">Registrati</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Nome"
              name="nome"
              register={register}
              error={errors.nome?.message}
              autoComplete="given-name"
              disabled={isSubmitting}
            />

            <TextField
              label="Cognome"
              name="cognome"
              register={register}
              error={errors.cognome?.message}
              autoComplete="family-name"
              disabled={isSubmitting}
            />
          </div>

          <TextField
            label="Telefono"
            name="telefono"
            type="tel"
            register={register}
            error={errors.telefono?.message}
            autoComplete="tel"
            placeholder="Inserisci il tuo numero di telefono"
            disabled={isSubmitting}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
            autoComplete="email"
            disabled={isSubmitting}
          />

          <div className="space-y-4">
            <TextField
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
              autoComplete="new-password"
              disabled={isSubmitting}
            />

            <TextField
              label="Conferma Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="w-full btn btn-orange mt-5"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registrazione in corso...' : 'Registrati'}
          </button>
          <p className="text-center text-gray-600 mt-2">
            Hai già un account?{' '}
            <Link to="/accesso/login" className="text-orange-500 hover:text-orange-600">
              Accedi
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
} 