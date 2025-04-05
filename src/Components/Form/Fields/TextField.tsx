import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register: UseFormRegister<any>;
  name: string;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  error, 
  register, 
  name, 
  type = "text",
  ...props 
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 pl-5">
        {label}
      </label>
      <input
        type={type}
        className={`w-full px-4 py-2 border special-rounded outline-none transition-colors
          ${error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:border-orange-500'
          }
        `}
        {...register(name)}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}; 