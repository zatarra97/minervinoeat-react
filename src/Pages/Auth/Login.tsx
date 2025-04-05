import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../Components/Form/ValidationSchemas/auth.schema';
import { TextField } from '../../Components/Form/Fields/TextField';
import { cognitoService } from '../../services/cognito';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      await cognitoService.signIn({
        email: data.email,
        password: data.password
      });
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Errore durante il login. Riprova.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white px-4 py-8 md:p-8 special-rounded shadow-sm max-w-md w-full space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800">Accedi</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
            autoComplete="email"
            disabled={isSubmitting}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
            autoComplete="current-password"
            disabled={isSubmitting}
          />

          <button
            type="submit"
            className="w-full btn btn-orange mt-5"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
          </button>
          <p className="text-center text-gray-600 mt-2">
            Non hai un account?{' '}
            <Link to="/accesso/registrati" className="text-orange-500 hover:text-orange-600">
              Registrati
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
} 